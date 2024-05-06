type DemoComponentPropsType= {
    myData : {
        name: string;
        address: string;
    }
}

const DemoComponent = ({myData}: DemoComponentPropsType) => {
    const {name, address} =myData;

  return (
    <div>DemoComponent
        <h1>Name: {name}</h1>
        <h2>Name: {address}</h2>
    </div>
  )
}

export default DemoComponent