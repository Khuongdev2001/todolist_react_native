import React,{useEffect, useState} from "react";
import { Text,View,StyleSheet,ScrollView,KeyboardAvoidingView,TextInput,TouchableOpacity, Platform,ImageBackground,AsyncStorage} from "react-native";
import {RNCamera} from "react-native-camera";
import Task from "./components/task";

export default function App(){
  const [job,setJob]=useState("");
  const [jobs,setJobs]=useState([]);
  // add array 
  function addJob(jobTitle){
    if(!jobTitle.trim()){
      alert("Vui Lòng Nhập Input");
      return;
    };
    const addJobs=[];
    setJobs(addJobs.concat(jobs).concat([jobTitle]));
    setJob("");
  }

  useEffect(()=>{
  },[job]);

  function deleteJob(index){
    const [...removeJobs]=jobs;
    removeJobs.splice(index,1);
    setJobs(removeJobs);
  }

  const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
      <Text>Waiting</Text>
    </View>
  );

  const takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
  };

  return<>
  <ScrollView>
  <View style={style.containter}>
  <RNCamera
          style={{flex: 1,justifyContent: 'flex-end',alignItems: 'center',}}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
              </View>
            );
          }}
    </RNCamera>
    <ImageBackground style={{flex: 1,resizeMode: "cover",justifyContent: "center"}} source={{uri:"https://i.pinimg.com/564x/11/94/d7/1194d7d6951ae87a5872931f200f7b00.jpg"}}>
      <View style={style.wrapper}>
        <Text style={style.title}>Todays's task</Text>
        <Text style={{color:"#FFFFFF",fontSize:20,height:50,padding:10}}>{job}</Text>
        <View style={style.listJob}>
          {
            jobs.map((value,index)=>{
              return (
              <TouchableOpacity key={index} onPress={()=>{deleteJob(index)}}>
                <Task style={style.job} props={{title:value}}/>
              </TouchableOpacity>)
            })
          }
        </View>
        {/* <KeyboardAvoidingView behavior={Platform.OS==="ios" ? "padding":"height"} enabled={true}> */}
            <View style={style.boxJobTitle}>
                <TextInput style={style.inputJobTitle} placeholder={"Nhập Công Việc Nè !"} value={job} onChangeText={(text)=>{setJob(text)}}/>
                <TouchableOpacity style={style.btnAdd} onPress={()=>{addJob(job)}}>
                <Text style={{fontSize:20}}>+</Text>
                </TouchableOpacity>
            </View>
        {/* </KeyboardAvoidingView> */}
      </View>
    </ImageBackground>
    </View>
  </ScrollView>
  </>
}

const style=StyleSheet.create({
  containter:{
    backgroundColor:"#F9F9F9",
    minHeight:"100%",
    borderRadius:10
  },
  wrapper:{
    paddingTop:90,
    paddingLeft:20,
    paddingBottom:51,
    paddingRight:20,
    position:"relative"
  },
  title:{
    fontSize:24,
    fontWeight:"bold",
    lineHeight:28,
    color:"#FFFFFF"
  },
  listJob:{
    paddingTop:30,
    fontSize:14,
    minHeight:450
  },
  brand:{
    position:"absolute",
    top:0,
    right:0,
    bottom:0,
    left:0,
    justifyContent:"center",
    alignItems:"center"
  },
  boxJobTitle:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  job:{
    marginBottom:5
  },
  inputJobTitle:{
    paddingRight:15,
    paddingLeft:15,
    backgroundColor:"#FFFFFF",
    flex:0.7,
    height:45,
    borderRadius:60,
    color:"#C0C0C0"
  },
  btnAdd:{
    width:60,
    height:60,
    color:"#C0C0C0",
    backgroundColor:"#FFFFFF",
    borderRadius:50,
    textAlign:"center",
    display:"flex",
    alignItems:"center",
    flexDirection:"row",
    justifyContent:"center",
  }
})