import React from 'react';
import { render, screen } from '@testing-library/react';
import PreviousResults from '../components/PreviousResults';
import { useParams, useNavigate } from 'react-router-dom';
import { apiCall } from '../App';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('../App', () => ({
  apiCall: jest.fn(),
}));

describe('PreviousResults component', () => {
  const mockGid = 'def456';
  const mockData = {
    oldSessions: ['abc123', 'xyz789'],
  };
  const mockData1 = {
    oldSessions: ['abc123', 'xyz789'],
  };

  beforeEach(() => {
    useParams.mockReturnValue({ gid: mockGid });
    useNavigate.mockReturnValue(jest.fn());
    apiCall.mockImplementation((url) => {
      if (url === `admin/quiz/${mockGid}`) {
        return Promise.resolve(mockData);
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders PreviousResults component without crashing', async () => {
    await render(<PreviousResults />);
  });

  test('renders "Previous Sessions" header', async () => {
    await render(<PreviousResults />);
    const headerElement = screen.getByRole('heading', { name: /previous sessions/i });
    expect(headerElement).toBeInTheDocument();
  });

  test('renders list of 1 session ID', async () => {
    await render(<PreviousResults />);
    const sessionIds = mockData1.oldSessions;
    const buttonElements = screen.getAllByRole('oldSession');
    expect(buttonElements.length).toBe(sessionIds.length);
    buttonElements.forEach((buttonElement, index) => {
      expect(buttonElement).toHaveTextContent(sessionIds[index]);
    });
  });

  test('renders list of previous session IDs', async () => {
    await render(<PreviousResults />);
    const sessionIds = mockData.oldSessions;
    const buttonElements = screen.getAllByRole('oldSession');
    expect(buttonElements.length).toBe(sessionIds.length);
    buttonElements.forEach((buttonElement, index) => {
      expect(buttonElement).toHaveTextContent(sessionIds[index]);
    });
  });
});
