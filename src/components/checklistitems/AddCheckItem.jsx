import { createCheckItems } from '../../TrelloApi.jsx';
import Form from '../ListForm.jsx';

const AddCheckItem = ({ setShowCheckItem, checkListId, checkItemData, setCheckItemData }) => {
    const handleCreateCheckItem = async name => {
        try {
            const res = await createCheckItems(checkListId, name);
            const data = await res.data;
            setCheckItemData([...checkItemData, data]);
            setShowCheckItem(false);
            toast.success("Created Checklist Item Successfully ")
        } catch (error) {
            toast.error("Internal Server Error", error);
        }
    }

    const handleCancelCheckItem = () => {
        setShowCheckItem(false)
    }
    return (
        <Form
            handleAddTo={handleCreateCheckItem}
            handleCancel={handleCancelCheckItem}
        />
    )
}

export default AddCheckItem