import React, { useEffect, useContext, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Typography, Box, Paper } from '@mui/material';
import Checklist from './checklist/CheckList';
import Form from './ListForm.jsx';
import Spinner from './Spinner';
import {
    getAllCardByListId,
    createCard,
    deleteCardByID
} from '../TrelloApi.jsx'

const Cards = ({ listId }) => {
    const [cardsData, setCardsData] = useState([]);
    const [showCardForm, setShowCardForm] = useState(false);
    const [showChecklist, setShowChecklist] = useState(false);
    const [selectedCard, setSelectedCard] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCardsData = async () => {
        setLoading(true);
        try {
            let res = await getAllCardByListId(listId);
            const data = await res.data;
            setCardsData(data);
        } catch (err) {
            console.error("Error Occured", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCardsData();
    }, [])

    const handleCreateCard = async (name) => {
        try {
            const res = await createCard(listId, name);
            const data = await res.data;
            setCardsData([...cardsData, data]);
            setShowCardForm(false);
        } catch (err) {
            console.error("Error Occured", err);
        }
    }

    const handleDeleteCard = async (cardId) => {
        try {
            deleteCardByID(cardId);
            setCardsData(cardsData.filter(card => card.id !== cardId));
        } catch (err) {
            console.error("Error Occured", err);
        }
    }

    const handleCancelCard = () => {
        setShowCardForm(false)
    }

    return (
        <Box component="ol" sx={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            {showChecklist && (
                <Checklist
                    setShowChecklist={setShowChecklist}
                    showChecklist={showChecklist}
                    selectedCard={selectedCard}
                />
            )}

            {loading ? (
                <Spinner />
            ) : (
                <>
                    {cardsData.map(card => (
                        <Paper
                            key={card.id}
                            sx={{
                                borderRadius: '0.6rem',
                                padding: '0.4rem',
                                marginBottom: '1rem',
                                backgroundColor: '#22272B',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                setSelectedCard([card.id, card.name]);
                                setShowChecklist(true);
                            }}
                        >
                            <Typography variant="body1" color="#B4C0CD">{card.name}</Typography>
                            <IconButton
                                onClick={e => {
                                    e.stopPropagation()
                                    handleDeleteCard(card.id)
                                }}
                                sx={{ cursor: 'pointer', padding: '3px', ml: 1, color: '#B4C0CD' }}
                            >
                                <DeleteIcon fontSize="medium" />
                            </IconButton>
                        </Paper>
                    ))}
                </>
            )}

            {showCardForm ? (
                <Box>
                    <Form
                        handleAddTo={handleCreateCard}
                        handleCancel={handleCancelCard}
                    />
                </Box>
            ) : (
                <Paper
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.5rem',
                        cursor: 'pointer',
                        color: '#B4C0CD',
                        backgroundColor: '#101204',
                        borderRadius: '1rem',
                        '&:hover': { backgroundColor: '#171B0F' }
                    }}
                    onClick={() => setShowCardForm(true)}
                >
                    <AddIcon sx={{ marginRight: '0.5rem' }} />
                    <Typography variant="h6">Add New Card</Typography>
                </Paper>
            )}
        </Box>
    )
}

export default Cards
