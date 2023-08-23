import {v4} from 'uuid';  //kütüphaneyi indirdik ve import ettik
import { useState } from 'react';
import BookCard from './components/BookCard';
import DeleteModal from './components/DeleteModal';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import EditModal from './components/EditModal';


function App() {
//!statel'ler
  const [books,setBooks] = useState([])
  const [showDelete,setShowDelete] = useState(false)
  const [deleteId,setDeleteId] = useState(null)
  const [showEdit,setShowEdit] = useState(false)
  const [editItem,setEditItem] = useState(null)
  


  //formun gönderilme olayı
  const handleSubmit = (e) => {
    //sayfa yenilenemesini önleme
    e.preventDefault();
    //input alanındaki yazılan kitap ismine erişme
    const title = e.target[0].value

    //kitap ismi girilmemişse uyarı ver
    if(!title){
      toast.warn('Lütfen Kitap İsmi Giriniz',{autoClose:2000})
      return;
    }

    //kitap obejesini oluşturma
    const newBook = {
      id:v4(),
      title: title, /* title yazarsak da olur aynı anlama geliyor üstte tanımlı çünkü */
      date: new Date(),
      isRead :false,
}

//oluşturulan objeyi kitaplar dizisine aktarma(diziye newBook u ekle daha sonra kitapları ekle böylelikle en son eklediğimiz kitap ilk başta gözükecektir)
setBooks([newBook,...books])

/* setBooks(books.concat(newBook)) > 
bu da kullanılabilirdi yukarıdaki metot yerine */ 

// inputu temizle
e.target[0].value = '';

//bildirim verme
toast.success('Kitap Başarıyla Eklendi',{autoClose: 2500})


  }

  // silme modal'ı için fonksiyon
    const handleModal = (id) => {
      //silinecek elemanın id'sini state 'e aktarma
          setDeleteId(id)
      //modal 'ı açar
      setShowDelete(true)
  
    }

    //silme işlemini yapar 
    const handleDelete = () => {
      // id sini bildiğimiz elemanı diziden çıkarma
      const filtred = books.filter((book)=>book.id !==deleteId )

      //state yi günceller
      setBooks(filtred)

      //modal'ı kapat
      setShowDelete(false)

      //bildirim vermesi için
      toast.error('Kitap Başarıyla silindi',{autoClose: 2500})
    }

//okundu işleminde çalışır
  const handleRead = (editItem) => {

    //!dizideki bir elemanı güncelleme
  // okundu değerini tersini çevir
    const updated ={...editItem, isRead: !editItem.isRead}
  
    //! 1.Yöntem

    //state in kopyasını alma
    const clone =[...books]

    //düzenlenecek elemanın sırasını bulma
    const index = books.findIndex((book)=>book.id===updated.id)

    //clone diziyi güncelleme
    clone[index] = updated

    //state'i günceller
    setBooks(clone)
    
    //! 2.Yöntem
    const newBooks = books.map((item)=>item.id !== updated.id ? item :updated
    )


    //state'i günceller
    setBooks(newBooks)

 
}

//edit modal işlemleri
const handleEditModal = (item) => {
  //modal'ı açar
  setShowEdit(true)
  //düzenlenecek elemanı stat'e aktarma
  setEditItem(item)
}

//elemanı düzenleme fonksiyonu
const updateItem = () => {
//kitaplar dizisini dön şayet düznlenecek elemanın id değeri döndüğün elemanın id değerine eşit ise onun title 'ını değişitir ve dizye aktar değilse olduğu gibi aktar
const updateBooks = books.map((book)=>book.id !==editItem.id ? book : editItem)

//state'i güncelleme
setBooks(updateBooks)

//modalı'kapatır
setShowEdit(false)

//bildirim verme
toast.info('kitap ismi düzenlendi',{autoClose:2000})

}



  return (
    <div className="App">
 <header className="bg-dark text-light py-2 fs-5 text-center">
  
  <h1>Kitap Kurdu</h1>
  

 </header>

<main className='container'>
{/* form alanına onSubmit verince kullanıcı hem enter a tıklayınca ekletebilir hem de ekle tuşuna basınca ekler */}
<form onSubmit={handleSubmit} className="d-flex gap-3 p-4 mt-4" >
  <input className="form-control shadow"  type="text" placeholder="Kitap İsmi Giriniz..." />
  <button className="btn btn-warning">Ekle</button>
</form>


{/* kitaplar dizisi boş ise */}
{books.length === 0 &&(
  <h4 className='mt-5 text-center'>Henüz Bir Kitap Eklenmedi</h4>
) }

{/* kitaplar bizisi doluysa */}
{books.map((book) => 
<BookCard 
  key={book.id} 
  handleModal = {handleModal} 
  data ={book}
  handleRead={handleRead}
  handleEditModal ={handleEditModal}
  />)}


</main>



{/* Modallar */}
{showDelete && 
<DeleteModal 
setShowDelete= {setShowDelete}
handleDelete = {handleDelete} />} {/* showDelete değeri true ise ekrana bas */}

{
  showEdit && <EditModal  
  editItem={editItem}
  setShowEdit= {setShowEdit}
  setEditItem ={setEditItem}
  updateItem = {updateItem}
  />
}


{/* bildirimler için */}
<ToastContainer/>
    </div>
  );
}

export default App;
