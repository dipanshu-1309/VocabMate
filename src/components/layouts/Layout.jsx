export default function Layout(props) {

  const { children } = props;

  return (
    <>
      <header> 
        <h1 className="text-gradient">VocabMate</h1>
      </header>
      <main>  
      {children}
      </main>
      <footer>
        <small>Created by</small>
        <a target="_blank" href="/">
        
        </a>
       <i className="fa-brands fa-github"></i>
      </footer>
    </>
  )
}
