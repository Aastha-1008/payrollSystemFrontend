import React, { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import dayjs from 'dayjs';
import './Calender.scss';

const CalendarWithEvents = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [openDialog, setOpenDialog] = useState(false);
    const [eventText, setEventText] = useState('');
    const [events, setEvents] = useState(() => {
        // Load from localStorage on first load only
        const savedEvents = localStorage.getItem('events');
        return savedEvents ? JSON.parse(savedEvents) : {};
    });

    // Save events to localStorage whenever the `events` state changes
    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    const handleAddEvent = () => {
        const dateStr = selectedDate.format('YYYY-MM-DD');
        const newEvents = { ...events };

        if (!newEvents[dateStr]) {
            newEvents[dateStr] = [];
        }

        newEvents[dateStr].push(eventText);
        setEvents(newEvents);
        setEventText('');
        setOpenDialog(false);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div className='calender-container'>
            <div className='calender '>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        value={selectedDate}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <Button variant="contained" onClick={handleOpenDialog}>
                Add Event
            </Button>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add Event on {selectedDate.format('YYYY-MM-DD')}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Event"
                        type="text"
                        fullWidth
                        value={eventText}
                        onChange={(e) => setEventText(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleAddEvent} disabled={!eventText}>
                        Add Event
                    </Button>
                </DialogActions>
            </Dialog>

            <h2>Events for {selectedDate.format('YYYY-MM-DD')}</h2>
            <List className='eventList'>
                {events[selectedDate.format('YYYY-MM-DD')] ? (
                    events[selectedDate.format('YYYY-MM-DD')].map((event, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={event} />
                        </ListItem>
                    ))
                ) : (
                    <p>No events for this date.</p>
                )}
            </List>
        </div>
    );
};

export default CalendarWithEvents;
