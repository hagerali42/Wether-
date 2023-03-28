/// <reference path="../typings/globals/jquery/index.d.ts" />

import { Next } from "./next.module.js";


export class Wether{
    constructor(){

 this.inputLocation=document.getElementById("seaerch");
  this.inputLocation.addEventListener('blur',()=>{
    this.wetherfunc(this.inputLocation.value)
  })
 this.searchbtn=document.getElementById("seaerchbtn");
 this.searchbtn.addEventListener('click',this.wetherfunc.bind(this))
this.place=document.getElementById("place");
this.degree=document.getElementById("degree");

this.wind_degree=document.getElementById("wind_degree");
this.vis_km=document.getElementById("vis_km");
this.wind_dir=document.getElementById("wind_dir");
this.currenticon=document.getElementById("icon");
 this.text=document.getElementById("text");
 this.last_updated=document.getElementById("last_updated")
 this.is_day=document.getElementById("is_day")
 this.wetherfunc("cairo")

 }

  async wetherfunc(searchValue)
    {
       
        let  api=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=413874994a374482902122201232502&q=${searchValue}&days=3`)
        let data = await api.json();
       
         //crruent day
            this.place.innerHTML=data.location.name;
             this.degree.innerHTML=data.current.temp_c
    
             this.wind_degree.innerHTML=data.current.wind_degree
             this.vis_km.innerHTML=data.current.vis_km
             this.wind_dir.innerHTML=data.current.wind_dir
            this.currenticon.setAttribute("src",data.current.condition.icon)
            this.text.innerHTML=data.current.condition.text
            this.last_updated.innerHTML= new Date (data.forecast.forecastday[0].date).toLocaleDateString('en-us', { day:"numeric",month:"long" })
             console.log( this.last_updated.innerHTML)
            const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            this.is_day.innerHTML= weekday[ new Date (data.forecast.forecastday[0].date).getDay()]

       let next=new Next (data);
    }


}