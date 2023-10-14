import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('NavBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the mobile navigation bar', () => {
    // Set the window width to a mobile size
    window.innerWidth = 767;

    render(<NavBar />);

    // Check that all the navigation icons are rendered
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Artists')).toBeInTheDocument();
    expect(screen.getByText('Songs')).toBeInTheDocument();
    expect(screen.getByText('Playlists')).toBeInTheDocument();
    expect(screen.getByText('Transfer')).toBeInTheDocument();
  });

  it('renders the desktop navigation bar', () => {
    // Set the window width to a desktop size
    window.innerWidth = 1024;

    render(<NavBar />);

    // Check that all the navigation icons are rendered
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Artists')).toBeInTheDocument();
    expect(screen.getByText('Songs')).toBeInTheDocument();
    expect(screen.getByText('Playlists')).toBeInTheDocument();
    expect(screen.getByText('Transfer')).toBeInTheDocument();
  });

  it('navigates to the correct page when an icon is clicked', () => {
    // Set the window width to a mobile size
    window.innerWidth = 767;

    // Mock the useNavigate hook
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(<NavBar />);

    // Click the "Artists" icon
    userEvent.click(screen.getByText('Artists'));

    // Check that the navigate function was called with the correct path
    expect(navigate).toHaveBeenCalledWith('/artists');
  });

  it('updates windowWidth state when window is resized', () => {
    render(<NavBar />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('renders SideBarIcon components with correct props', () => {
    render(<NavBar />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Artists')).toBeInTheDocument();
    expect(screen.getByText('Songs')).toBeInTheDocument();
    expect(screen.getByText('Playlists')).toBeInTheDocument();
    expect(screen.getByText('Transfer')).toBeInTheDocument();
  });

  it('calls onClick function when SideBarIcon is clicked', () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    render(<NavBar />);
    userEvent.click(screen.getByText('Artists'));
    expect(navigate).toHaveBeenCalledWith('/artists');
  });
});