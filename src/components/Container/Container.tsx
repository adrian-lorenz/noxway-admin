import './Container.css';

function Container(props: any) {
  return (
    <div className='content_container'>
      {props.children}
    </div>
  );
}

export default Container;
