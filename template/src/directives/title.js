export default{ 
  title: {
    bind(el){
      document.title = el.dataset.title
    }
  }
}