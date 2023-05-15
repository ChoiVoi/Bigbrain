import { apiCall } from '../App';

function UploadGameFile (id, name, file) {
  const reader = new FileReader();
  reader.onload = async (e) => {
    const text = (e.target.result);
    const jsonFile = JSON.parse(text);
    const questions = jsonFile.questions;
    const thumbnail = jsonFile.thumbnail;
    for (let i = 0; i < questions.length; i++) {
      questions[i].id = i;
    }

    const payload = {
      questions,
      name,
      thumbnail,
    };

    const response = await apiCall(`admin/quiz/${id}`, 'PUT', payload);
    if (response.error) {
      alert(response.error);
    }
  };
  reader.readAsText(file);
}

export default UploadGameFile;
