class ProductList extends React.Component {
    render() {
      return (
        <div className='ui unstackable items'>
          Hello, friend! I am a basic React component.
        </div>
      );
    }
  }

// tell the React framework that our component should be inserted on this page.
// instruct React to render this ProductList inside a specific DOM node

// ReactDOM.render([what], [where]);
ReactDOM.render(
    <ProductList />, // what to render
    document.getElementById('content') // where to render it
);
