import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef, useMemo,useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import axios from "axios";
import Modal from 'react-modal';
import Swal from 'sweetalert2';

const { TextArea } = Input;

export default function UploadPage({ isOpen, onRequestClose }) {
  const quillRef = useRef(null);
  const userId=localStorage.getItem('userId');
  const token=localStorage.getItem('jwt');
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files[0];
      let formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch("http://192.168.0.30:8080/image/", {method: "POST", body: formData});
        const imgUrl = (await res.json()).url;
        const editor = quillRef.current.getEditor(); 
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', "http://192.168.0.30:8080/image/" + imgUrl);
        editor.setSelection(range.index + 1);
      } catch (error) {
        console.log(error);
      }
    });
  };
  const titleChangeHandler = (event) => {
      setTitle(event.currentTarget.value)
  }
  const showWriteAlert = () => {
    Swal.fire({
      title: `액자를 만들었습니다~~`,
      text: '벽에 걸렸어요',
      icon: 'success', // 물음표 아이콘
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.value) {
      // 'OK' 버튼을 클릭했을때 실행할 함수
        window.location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      // 'Close' 버튼을 클릭했을 때 할 동작, 여기서는 아무것도 하지 않음
      }
    });
  }
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
          [{ 'color': [] }, { 'background': [] }], 
          ['image'],
        ],
        handlers: { image: imageHandler },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    [],
  );
  const submitHandler = (event) => {
    event.preventDefault();

    if (!Title || !Description ) {
        return alert(" 모든 값을 넣어주셔야 합니다.")
    }


    //서버에 채운 값들을 request로 보낸다.

    const body = {
        userId: userId,
        title:Title,
        content:Description,
        jwt:token,
    }
    // onRequestClose(true);
    axios.post('http://192.168.0.30:8080/post/', body)
        .then(response => {
            if (null !== response) {
                // alert('글 업로드에 성공 했습니다.')
                showWriteAlert()
               
            } else {
                alert('글 업로드에 실패 했습니다.')
            }
        })
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'color',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'align',
    'image',
  ];

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
   <h2>🌟 글을 작성해주세요 🌈 </h2><br/><br/>

📚 글쓰기 페이지에 오신 것을 환영합니다!<br/>

🎨 다양한 편집 도구를 사용하여 글에 생동감을 불어넣으세요.<br/>
    <br/>
    TITLE
    <Input onChange={titleChangeHandler} value={Title} />
    <br/>
    <br/>
    CONTENT
    <ReactQuill
      ref={quillRef}
      onChange={setDescription}
      modules={modules}
      formats={formats}
      value={Description}
      placeholder={'글을 작성해주세요!'}
      theme="snow"
      style={{ height: '550px', marginBottom: '50px' }}
    />
    <button className="button edit-button" onClick={onRequestClose}>닫기</button>
    <button className="button close-button" onClick={submitHandler}>확인</button>
    </Modal>
    
  );
}