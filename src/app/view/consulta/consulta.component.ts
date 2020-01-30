import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CaoUsuario } from 'src/app/models/cao-usuario';

import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);



@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit { 


  lstdata:CaoUsuario[];
  lstBusqueda:CaoUsuario[]=[];
  lstRsul:any[];
  lstTotal:any[];
  p1:any=0;
  p2:any=0;
  


  obj={
    year1:2007,
    year2:2007,
    mes1:1,
    mes2:1,
    user:[]
  } 

  constructor(private ServicesUsuario:UsuarioService) { }


  ngOnInit() {       
    this.ListarConsultores();
   
  }

  ListarConsultores(){
    this.ServicesUsuario.ListarConsultores().subscribe((data:any[])=>{
      this.lstdata = data;      
    },(err)=>{
      console.log(err);
    });
  }

  Add(e){
    this.lstBusqueda.push(e);    
    this.lstdata.slice(0,1);
    
    for (let i = 0; i < this.lstdata.length; i++) {
      if(this.lstdata[i].co_usuario === e.co_usuario){
        this.lstdata.splice(i, 1); 
      }      
    }
  }

  Delete(e){
    this.lstdata.push(e);   
    this.lstBusqueda.slice(0,1);
    
    for (let i = 0; i < this.lstBusqueda.length; i++) {
      if(this.lstBusqueda[i].co_usuario === e.co_usuario){
        this.lstBusqueda.splice(i, 1); 
      }      
    }
  }

  ListarRelatorio(){
   this.obj.user=[]; 
   this.lstBusqueda.forEach(element => {
     this.obj.user.push(element.co_usuario);
   });  

   if(this.obj.user.length>0){
    this.ServicesUsuario.ListarRelatorio(this.obj).subscribe((data:any[]) =>{

      console.log(this.obj);
      this.lstRsul = data;
      this.Total();
      
    },(err)=>{
      console.log(err);
    });

   }else{
     alert('Debe Seleccionar al menos 1 consultor');
   }
    

  }

  Total(){
    this.lstTotal=[];
    this.ServicesUsuario
    this.ServicesUsuario.Total(this.obj).subscribe((data:any[]) =>{
      this.lstTotal = data;   
    
    },(err)=>{
      console.log(err);
    });
  }

  grafico(){  
    let costo=0;
    let per=0;   
    let total=0;
    this.obj.user=[]; 
    this.options.xAxis.categories =[];    
    this.options.series[0].data=[];
    this.options.series[1].data=[];

  
    
    this.lstBusqueda.forEach(element => {
      this.obj.user.push(element.co_usuario);
     
   });  
   

   if(this.obj.user.length>0){
    this.ServicesUsuario.Grafico(this.obj).subscribe((data:any[]) =>{         
        
      for (let i = 0; i < data.length; i++) {
        this.options.xAxis.categories.push(data[i].fecha);                       
        this.options.series[0].data.push({name:data[i].no_usuario,y:data[i].ganancias});   
        costo=data[i].Costo_Fijo;   
        per=per+1;
      }       
      total = costo/per;

      for (let index = 0; index < per; index++) {
       this.options.series[1].data.push({y:3200});                     
        
      }      

      this.options.title.text ='Performance Comerc...';    
  
    Highcharts.chart('container1', this.options);

  },(err)=>{
    console.log(err);
  });

   }else{
     alert('Debe Seleccionar al menos 1 consultor');
   }
  }

  Pizza(){
    this.obj.user=[]; 
    this.graf2.series[0].data=[];         
    this.lstBusqueda.forEach(element => {
    this.obj.user.push(element.co_usuario);
   });  

   if(this.obj.user.length>0){
    this.ServicesUsuario.Pizza(this.obj).subscribe((data:any[]) =>{ 
      console.log(data);        
      for (let i = 0; i < data.length; i++) {
        this.graf2.series[0].data.push({name:data[i].no_usuario,y:data[i].ganancias});  
           
      }           
    this.graf2.title.text ='Participacao...';    
    Highcharts.chart('container2', this.graf2);
     
  },(err)=>{
    console.log(err);
  });
   }else{
     alert('Debe Seleccionar al menos 1 consultor');
   }    
 
  }

  public options: any = {
    chart: {
      type: 'column'
  },
  title: {
      text: ''
  },
  subtitle: {
      text: ''
  },
  xAxis: {
      categories: [
        
      ],
      crosshair: true
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Rainfall (mm)'
      }
  },
  tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
  },
  plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      }
  },
  series: [{
      name: '',
      data: []
  },{
    type: 'spline',
    name: 'Custo Fixo',
    data: []
  }
]
};


public graf2:any={
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
},
title: {
    text: 'Browser market shares in January, 2018'
},
tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
},
plotOptions: {
    pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        },
        showInLegend: true
    }
},
series: [{
    name: 'Brands',
    colorByPoint: true,
    data: [{
        name: '',
        y:null        
    }]
}]
  }
  





   
}














