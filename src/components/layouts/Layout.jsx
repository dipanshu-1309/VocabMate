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
        <a target="_blank" href="https://github.com/dipanshu-1309/VocabMate">
        <img alt="pfp" src="https://avatars.githubusercontent.com/u/183845322?v=4" /><p>@dipanshu-1309</p>
        <i className="fa-brands fa-github"></i>
        </a>
       
      </footer>
    </>
  )
}
