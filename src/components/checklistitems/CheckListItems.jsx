import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, Checkbox, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { getCheckItems, deleteCheckItemById, updateCheckItems } from '../../TrelloApi.jsx';
import ProgressBar from './ProgressBar.jsx';
import Spinner from '../Spinner.jsx';
import AddCheckItem from './AddCheckItem.jsx';

const CheckListItems = ({ checkListId, selectedCardId }) => {

    const [checkItemData, setCheckItemData] = useState([]);
    const [showCheckItem, setShowCheckItem] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchCheckItem = async (checkListId) => {
        setLoading(true);
        try {
            const res = await getCheckItems(checkListId);
            const data = await res.data;
            setCheckItemData(data);

        } catch (error) {
            toast.error("Internal Server Error", error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCheckItem(checkListId);
    }, [checkListId]);

    const handleDeleteCheckItem = async (checkItemId) => {
        try {
            await deleteCheckItemById(checkListId, checkItemId);
            setCheckItemData(checkItemData.filter(ele => ele.id !== checkItemId));
            toast.success("Deleted Checklist Item Successfully ")
        } catch (error) {
            toast.error("Internal Server Error", error);
        }
    }

    const toggleCheckItems = async (checkItemId, currentState) => {
        try {
            const newState = currentState === 'complete' ? 'incomplete' : 'complete';
            await updateCheckItems(selectedCardId, checkListId, checkItemId, newState);

            const updatedCheckItems = checkItemData.map(item => {
                if (item.id === checkItemId) {
                    return {
                        ...item,
                        state: newState
                    }
                }
                return item
            })
            setCheckItemData(updatedCheckItems);


        } catch (error) {
            toast.error("Internal Server Error", error);
        }
    };

    const totalCheckedItem = checkItemData.length;
    const completedCount = checkItemData.filter(item => item.state === 'complete').length;
    const progressValuePercentage = totalCheckedItem === 0 ? 0 : (completedCount / totalCheckedItem) * 100;


    return (
        <Box className="checklist-items" sx={{ p: 1 }}>
            <ProgressBar progress={progressValuePercentage} />

            {loading ? (
                <Spinner />
            ) : (
                <>
                    {checkItemData.map(item => (
                        <Box
                            key={item.id}
                            sx={{
                                borderRadius: '.4rem',
                                padding: '.2rem',
                                marginBottom: '.3rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox
                                    checked={item.state === 'complete'}
                                    onChange={() => toggleCheckItems(item.id, item.state)}
                                    sx={{
                                        height: '.6rem',
                                        width: '1rem',
                                        marginRight: '1rem',
                                    }}
                                />
                                <Typography
                                    sx={{
                                        textDecoration: item.state === 'complete' ? 'line-through' : 'none',
                                        flex: 1,
                                    }}
                                >
                                    {item.name}
                                </Typography>
                            </Box>
                            <IconButton
                                onClick={() => handleDeleteCheckItem(item.id)}
                                size="small"
                                sx={{
                                    width: 'fit-content',
                                    height: 'auto',
                                    color: '#B6C2CF',
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                </>
            )}

            {showCheckItem ? (
                <Box sx={{ margin: '.8rem' }}>
                    <AddCheckItem
                        setShowCheckItem={setShowCheckItem}
                        checkListId={checkListId}
                        setCheckItemData={setCheckItemData}
                        checkItemData={checkItemData}
                    />
                </Box>
            ) : (
                <Box className="add-cardItem" sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        sx={{
                            color: '#B6C2CF',
                            backgroundColor: '#3B444C',
                            mt: 0.2,
                            ml: '.8rem',
                        }}
                        onClick={() => setShowCheckItem(true)}
                    >
                        Add an Item
                    </Button>
                </Box>
            )}
        </Box>
    )
}

export default CheckListItems