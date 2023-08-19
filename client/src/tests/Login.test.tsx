import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../components/Login';


describe('Login', () => {
    it('should render the component without errors', () => {
        render(<Login />);
        expect(screen.getByText('Welcome')).toBeInTheDocument();

    });

  });