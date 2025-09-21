#!/bin/bash

# React Native Base App Boilerplate Setup Script
# This script helps create a new React Native project from this boilerplate

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Print colored output
print_header() {
    echo -e "\n${CYAN}════════════════════════════════════════════════${NC}"
    echo -e "${BOLD}$1${NC}"
    echo -e "${CYAN}════════════════════════════════════════════════${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"

    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js >= 20"
    fi

    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 20 ]; then
        print_error "Node.js version must be >= 20. Current version: $(node -v)"
    fi
    print_success "Node.js $(node -v) detected"

    # Check npm/yarn
    if command -v yarn &> /dev/null; then
        print_success "Yarn $(yarn -v) detected"
        PACKAGE_MANAGER="yarn"
    elif command -v npm &> /dev/null; then
        print_success "npm $(npm -v) detected"
        PACKAGE_MANAGER="npm"
    else
        print_error "Neither npm nor yarn is installed"
    fi

    # Check Git
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed"
    fi
    print_success "Git $(git --version | cut -d' ' -f3) detected"

    # Check React Native CLI
    if ! command -v npx &> /dev/null; then
        print_error "npx is not installed"
    fi
    print_success "npx detected"
}

# Get project details
get_project_details() {
    print_header "Project Configuration"

    read -p "$(echo -e ${CYAN}Project name \(lowercase, no spaces\): ${NC})" PROJECT_NAME
    if [ -z "$PROJECT_NAME" ]; then
        print_error "Project name is required"
    fi

    # Validate project name
    if [[ ! "$PROJECT_NAME" =~ ^[a-z0-9-]+$ ]]; then
        print_error "Project name must contain only lowercase letters, numbers, and hyphens"
    fi

    read -p "$(echo -e ${CYAN}Project path \(default: ./$PROJECT_NAME\): ${NC})" PROJECT_PATH
    if [ -z "$PROJECT_PATH" ]; then
        PROJECT_PATH="./$PROJECT_NAME"
    fi

    # Check if directory exists
    if [ -d "$PROJECT_PATH" ]; then
        print_warning "Directory $PROJECT_PATH already exists"
        read -p "$(echo -e ${YELLOW}Overwrite? \(y/N\): ${NC})" OVERWRITE
        if [ "$OVERWRITE" != "y" ] && [ "$OVERWRITE" != "Y" ]; then
            print_error "Aborted"
        fi
        rm -rf "$PROJECT_PATH"
    fi
}

# Clone boilerplate
clone_boilerplate() {
    print_header "Setting Up Project"

    BOILERPLATE_PATH=$(pwd)

    print_info "Creating project directory..."
    mkdir -p "$PROJECT_PATH"

    print_info "Copying boilerplate files..."
    # Copy everything except node_modules, .git, and other unnecessary files
    rsync -av --progress \
        --exclude="node_modules" \
        --exclude=".git" \
        --exclude="ios/build" \
        --exclude="ios/Pods" \
        --exclude="android/build" \
        --exclude="android/.gradle" \
        --exclude="*.log" \
        --exclude=".DS_Store" \
        "$BOILERPLATE_PATH/" "$PROJECT_PATH/"

    print_success "Files copied successfully"
}

# Initialize project
initialize_project() {
    print_header "Initializing Project"

    cd "$PROJECT_PATH"

    # Initialize git
    print_info "Initializing Git repository..."
    git init
    print_success "Git initialized"

    # Run the Node.js initialization script
    if [ -f ".boilerplate/init.js" ]; then
        print_info "Running project initialization..."
        node .boilerplate/init.js
    else
        print_warning "Initialization script not found"
    fi

    # Create initial commit
    print_info "Creating initial commit..."
    git add .
    git commit -m "Initial commit from React Native Base App Boilerplate" || true
    print_success "Initial commit created"
}

# Print next steps
print_next_steps() {
    print_header "✨ Project Created Successfully!"

    echo -e "${BOLD}Your new React Native project is ready at: ${GREEN}$PROJECT_PATH${NC}\n"

    echo -e "${BOLD}Next steps:${NC}"
    echo -e "1. ${CYAN}cd $PROJECT_PATH${NC}"
    echo -e "2. Configure your project:"
    echo -e "   - Update bundle identifiers in iOS and Android"
    echo -e "   - Configure environment variables"
    echo -e "   - Update app icons and splash screens"
    echo -e "3. Run your project:"
    echo -e "   ${CYAN}# iOS${NC}"
    echo -e "   npx react-native run-ios"
    echo -e "   ${CYAN}# Android${NC}"
    echo -e "   npx react-native run-android"
    echo -e "\n${GREEN}Happy coding! 🚀${NC}"
}

# Main function
main() {
    clear
    echo -e "${BOLD}${CYAN}"
    echo "╔══════════════════════════════════════════════════╗"
    echo "║                                                  ║"
    echo "║     React Native Base App Boilerplate           ║"
    echo "║           Project Generator                     ║"
    echo "║                                                  ║"
    echo "╚══════════════════════════════════════════════════╝"
    echo -e "${NC}"

    check_prerequisites
    get_project_details
    clone_boilerplate
    initialize_project
    print_next_steps
}

# Run main function
main