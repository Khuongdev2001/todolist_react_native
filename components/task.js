import React from "react";
import {Text,View,StyleSheet} from "react-native";
import Random from "../helpers/random";

export default function Task(data){
    const icons=["😲","😎","🧡","😍","😁","🎨","🍗"];
    const props=data.props;
    return <>
        <View style={style.job}>
            <Text style={style.icon1}></Text>
            <Text style={style.jobTitle}>{props.title} {icons[Random(0,7)]}</Text>
            <Text style={style.icon2}></Text>
        </View>
    </>
}

const style=StyleSheet.create({
    job:{
        backgroundColor:"#FFFFFF",
        padding:15,
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom:10,
        borderRadius:10
    },
    icon1:{
        backgroundColor:"#55BCF6",
        height:24,
        width:24,
        borderRadius:100,
        borderWidth:2,
    },
    jobTitle:{
        flex:0.8
    },
    icon2:{
        borderWidth:2,
        borderRadius:5,
        borderColor:"#55BCF6",
        width:12,
        height:12
    }
})