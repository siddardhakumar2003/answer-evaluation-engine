import React ,{useState} from 'react';
import './Home.css';
import axios from 'axios';

const Home = () => {
    const [numStudents, setNumStudents] = useState(0);
  const [numAnswers, setNumAnswers] = useState(0);
  const [studentFiles, setStudentFiles] = useState([]);
  const [answerFiles, setAnswerFiles] = useState([]);
  const [i,setI]= useState(0);
  const [j,setJ]= useState(0);

  const handleStudentFileChange = (index, event) => {
    const newStudentFiles = [...studentFiles];
    newStudentFiles[index] = event.target.files[0];
    setStudentFiles(newStudentFiles);
  };

  const handleAnswerFileChange = (index, event) => {
    const newAnswerFiles = [...answerFiles];
    newAnswerFiles[index] = event.target.files[0];
    setAnswerFiles(newAnswerFiles);
  };

  const handleSubmit = async  (event) => {
    event.preventDefault();
    // Handle file upload here
    var i
    answerFiles.forEach(async (file,index) =>{
      if (file) {
        const renamedFile = new File([file],"answer_"+(index+1), {
          type: file.type,
          lastModified: file.lastModified,
        });
        setJ(j+1);
        const formData = new FormData();
        formData.append('file',renamedFile);
  
        try {
          const res = await axios.post('http://localhost:5000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if(res.status===200)
          {
              
          }
        } catch (err) {
          console.error('Error uploading file:', err);
        }
      } else {
        console.log('No file selected');
      }});

    studentFiles.forEach(async (file,index) =>{
    if (file) {
      const renamedFile = new File([file],"student_"+(index+1), {
        type: file.type,
        lastModified: file.lastModified,
      });
      setI(i+1);
      const formData = new FormData();
      formData.append('file',renamedFile);

      try {
        const res = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (err) {
        console.error('Error uploading file:', err);
      }
    } else {
      console.log('No file selected');
    }});
    const link=document.querySelector('.style-link');
    link.style.display='flex';
    console.log("Student Files:", studentFiles);
    console.log("Answer Files:", answerFiles);
  };

  return (
    <div>
      <form action="/loading" onSubmit={handleSubmit}>
        <div>
          <label>
            Number of Students:
            <input
              type="number"
              value={numStudents}
              onChange={(e) => setNumStudents(Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            Number of Expected Answers:
            <input
              type="number"
              value={numAnswers}
              onChange={(e) => setNumAnswers(Number(e.target.value))}
            />
          </label>
        </div>

        {[...Array(numStudents)].map((_, index) => (
          <div key={index}>
            <label>
              Student {index + 1} File:
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg"
                onChange={(e) => handleStudentFileChange(index, e)}
                required
              />
            </label>
          </div>
        ))}

        {[...Array(numAnswers)].map((_, index) => (
          <div key={index}>
            <label>
              Answer {index + 1} File:
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg"
                onChange={(e) => handleAnswerFileChange(index, e)}
                required
              />
            </label>
          </div>
        ))}

        <button type="submit">Submit</button>
        <a href='/loading' className='style-link'>Next</a>
      </form>
    </div>
  );
};

export default Home;