import apiClient from "../api/baseurl";
import endPoints from "../api/endPoints";




const uploadImages = async (image: unknown) => {
    const formData = new FormData();
    formData.append('image', image as Blob);

    try {
        const response = await apiClient({...endPoints.imageUpload, data: formData});
        // console.log(response.data.data,"response from backend");
        return response.data.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
}

export default uploadImages;