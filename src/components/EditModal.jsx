const  EditModal = (props)=>{
    return (
        <div className="delete-modal">
    <div className="modal-inner"> 
    <h5>Kitap İsmini Düzenle</h5>
    <input 
    value={props.editItem.title} className="form-control shadow"
    type="text"
    //elemanın ismi düzeltilirse deeğişikleri düzenle
    onChange={(e)=>props.setEditItem({
    ...props.editItem,
    title:e.target.value,
    date: new Date(),
    
    })} />
    <div className="d-flex justify-content-between mt-4">
        <button 
        onClick={()=>props.setShowEdit(false)} className="btn btn-warning">Vazgeç</button>
        <button 
        className="btn btn-success"
        onClick={()=>props.updateItem()} 
        
        >Kaydet</button>
    </div>
    </div>
        </div>
       
    )

}

export default EditModal;