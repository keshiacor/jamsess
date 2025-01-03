import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Playlist from './Playlist';

describe('Playlist Component', () => {
  const mockOnUpdateName = jest.fn();
  const mockOnRemove = jest.fn();
  const mockOnSave = jest.fn();
  const mockPlaylistTracks = [
    { id: 1, name: 'Track 1' },
    { id: 2, name: 'Track 2' },
  ];

  beforeEach(() => {
    render(
      <Playlist
        onUpdateName={mockOnUpdateName}
        playlistName="My Playlist"
        playlistTracks={mockPlaylistTracks}
        onRemove={mockOnRemove}
        onSave={mockOnSave}
      />
    );
  });

  test('renders input with correct placeholder and value', () => {
    const inputElement = screen.getByPlaceholderText('New Playlist');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('My Playlist');
  });

  test('calls onUpdateName when input value changes', () => {
    const inputElement = screen.getByPlaceholderText('New Playlist');
    fireEvent.change(inputElement, { target: { value: 'Updated Playlist' } });
    expect(mockOnUpdateName).toHaveBeenCalledWith('Updated Playlist');
  });

  test('clears placeholder on input focus', () => {
    const inputElement = screen.getByPlaceholderText('New Playlist');
    fireEvent.focus(inputElement);
    expect(inputElement).toHaveAttribute('placeholder', '');
  });

  test('renders Tracklist component with correct props', () => {
    const tracklistElement = screen.getByText('Track 1');
    expect(tracklistElement).toBeInTheDocument();
  });

  test('calls onSave when save button is clicked', () => {
    const buttonElement = screen.getByText('Save To Spotify');
    fireEvent.click(buttonElement);
    expect(mockOnSave).toHaveBeenCalled();
  });
});