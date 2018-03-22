import React from 'react';
import { StyleSheet, Text, View, ListView} from 'react-native';
import firebase from './firebase';

export default class App extends React.Component {
  
constructor (props){
  super(props);



database= firebase.database();
 
    items=[];
    this.state ={
      Nombre:'',
      Galeria:'',
      Email: '',
      Direccion: '',
      Cierre: '',
      Apertura:'',
      Descripcion:'',
      Telefono:'',
      Imagen:'',
      
  dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
};
}
componentWillMount(){
  database.ref('messages').on('value' ,(snap) => {
      snap.forEach((data) => {
        items.push({
          key: data.key,
          data: data.val(),
        });
      })
      this.setState({dataSource:this.state.dataSource.cloneWithRows(items)});
  }); 

}
renderRow(data){
  return(
    <View> 
      <Text>Nombre:{data.data.Nombre}</Text>
      <Text>Galeria:{data.data.Galeria}</Text>
      <Text> Dirección:{data.data.Direccion}</Text>
      <Text> Apertura:{data.data.Apertura}</Text>
      <Text> Cierre:{data.data.Cierre}</Text>
      <Text> Descripción:{data.data.Descripcion}</Text>
      <Text> Imagen:{data.data.Imagen}</Text>
<View style={{height:3, backgroundColor:'green'}} />
      </View>
  )
}

  render() {
    return (
      <View style={{flex: 1}}>
      <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderRow.bind(this)} />
      

      </View>
    );
  }
}


