const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "Chaton.jpeg"; // This should be dynamically set based on your build output
    
    const file = fs.createReadStream(src);
    formData.append('file', file);
    
    const pinataMetadata = JSON.stringify({
        name: 'Chaton', // This should be the name of your pin, you can make this dynamic too
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
    });
    formData.append('pinataOptions', pinataOptions);

    try {
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${process.env.JWT}` // Securely load the JWT from environment variables
            }
        });
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

pinFileToIPFS();
