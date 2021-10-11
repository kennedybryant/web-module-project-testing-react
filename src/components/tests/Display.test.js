import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Display from '../Display';

import fetchShow from '../../api/fetchShow';
import userEvent from '@testing-library/user-event';
jest.mock('../../api/fetchShow');

const testShow = {
    name: 'Test Show Name',
    summary: 'Test Summary Name',
    seasons: [
        {
            id: '0',
            name: 'season 1',
            episodes: []
        },
        {
            id: '1',
            name: 'season 2',
            episodes: []
        },
        {
            id: '2',
            name: 'season 3',
            episodes: []
        }
    ]
}

test('Renders without errors', () => {
    render(<Display />);
});

test('Renders Show Component when button is pressed', async () => {
   fetchShow.mockResolvedValueOnce(testShow); 

   render(<Display />);

   const button = screen.getByRole("button");
   userEvent.click(button);

   const show =  await screen.findByTestId('show-container');
   expect(show).toBeInTheDocument();
});

test('Rendered select options length is equal to number of seasons when button is pressed', async () => {
    fetchShow.mockResolvedValueOnce(testShow); 

    render(<Display />);
 
    const button = screen.getByRole("button");
    userEvent.click(button);
 
    await waitFor (() => {
        const seasons = screen.queryAllByTestId('season-option');
        expect(seasons).toHaveLength(3);
    });
});

test('displayFunc called when button is pressed', async () => {
    fetchShow.mockResolvedValueOnce(testShow); 
    const displayFunc = jest.fn();
    render(<Display displayFunc={displayFunc}/>);

    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(() => {
        expect(displayFunc).toBeCalled();
    });
});










///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.