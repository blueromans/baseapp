// React and React Native
import React, { useState } from 'react';

// Components and Hooks
import { ListTemplate, Card, ListItem, SearchBar } from '@/components';

interface ListItemData {
  id: string;
  title: string;
  description: string;
}

const Home: React.FC = React.memo(() => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const data: ListItemData[] = Array.from({ length: 20 }, (_, i) => ({
    id: `item-${i}`,
    title: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
  }));

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const renderItem = ({ item }: { item: ListItemData }) => {
    if (!item) return null;

    return (
      <Card
        variant="elevated"
        margin={8}
        padding={16}
        onPress={() => console.log('Pressed:', item.title)}
      >
        <ListItem
          title={item.title}
          subtitle={item.description}
          leftIcon={<>📋</>}
          rightIcon={<>›</>}
        />
      </Card>
    );
  };

  return (
    <ListTemplate
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={(item: any) => item.id}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      headerComponent={
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search items..."
        />
      }
      emptyMessage="No items found"
      emptyIcon="📭"
    />
  );
});

export default Home;
