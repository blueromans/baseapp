// Third Party Libraries
import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';

interface CustomErrorPayload {
  success: boolean;
  message: string;
}

// Type guard to check if action has our custom payload
function hasCustomPayload(
  action: unknown,
): action is { type: string; payload: CustomErrorPayload } {
  const payload = (action as any)?.payload;
  return (
    payload &&
    typeof payload === 'object' &&
    'success' in payload &&
    'message' in payload
  );
}

export const rtkQueryErrorLogger: Middleware = () => next => action => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    console.warn('[API Error]', {
      type: (action as any).type,
      payload: (action as any).payload,
    });
  }

  if (hasCustomPayload(action) && !action.payload.success) {
    console.warn('[Custom Error]', action.payload.message);
  }

  return next(action);
};
