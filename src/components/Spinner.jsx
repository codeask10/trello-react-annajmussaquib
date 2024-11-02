import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: 'block',
    margin: '30 auto'
};

const Spinner = ({ loading }) => {
    return (
        <ClipLoader
            color="#4338ca"
            loading={loading}
            cssOverride={override}
            size={60}
        />
    )
}

export default Spinner