{/* sürekli props. yazmak istemiyorsan propsların obje olarak geldiğini bildiğimiz için altta parametre içine ({data}) böylelikle içindeki dataya ulaşmış oluruz */}
const BookCard = ({
  data,
  handleModal,
  handleRead,
  handleEditModal}) =>{

    return (
  <div className="d-flex justify-content-between border shadow rounded p-3 align-items-center mt-5">
    <div >
            {/* classlarda and (&&) operatörü null veya undefined döndürdüğü için ternary(? :) operatörünü kullandık */}
            <h5 className={data.isRead ? "text-decoration-line-through" : ""}>{data.title}</h5> 
            
            <p>{new Date(data.date).toLocaleString()}</p> 
            {/* date obje olduğu için direk ekrana basamayız toLocaleString hem saat hem tarihi de ekrana basa */}
        </div>
       
        <div className="btn-group">
            <button onClick={()=>handleModal(data.id)} className="btn btn-danger" >Sil</button>
            <button className="btn btn-primary" onClick={()=> handleEditModal(data)}>Düzenle</button>
            <button onClick={()=>handleRead(data)} className="btn btn-success" >
              {data.isRead ? 'Okundu' : 'Okunmadı'}</button>
        </div>

  </div>
    )
}

export default BookCard 