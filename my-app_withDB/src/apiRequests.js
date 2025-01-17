const apiRequest = async (url = '', options = null) => {
    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error('Error response!');
        }

    } catch (err) {
        throw new Error(err.message);
    }
};

export default apiRequest;
