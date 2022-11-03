import { Component } from '@angular/core';
import Swal from 'sweetalert2'

import * as XLSX from 'xlsx';
import { UpdateCobroService } from './core/services/update-cobro.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
convertedJson!: String;
pruebaJson!:any;
data!:Array<any>;
constructor(private updateCobroService:UpdateCobroService){}

fileUpload(event: any) {
  const selectFile = event.target.files[0];
  const fileReader = new FileReader();
  fileReader.readAsBinaryString(selectFile);
  fileReader.onload = (event:any) =>{
    console.log(event);
    let binaryData = event.target.result;
    let workbook = XLSX.read(binaryData,{type:'binary'});
    workbook.SheetNames.forEach(sheet=>{
      this.data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
      this.convertedJson = JSON.stringify(this.data, undefined,4);
      this.pruebaJson={...this.data}
    })
  }
}

//if(updateCobros ==  0){

 async updateCobros() {
   for(let i = 0; i < this.data.length; i++){
     this.updateCobroService.actualizarCobros(this.pruebaJson[i]['cobrado'],this.pruebaJson[i]['adicional2']).subscribe((response:any)=>{
      console.log(response);
    })
  }
 
  await Swal.fire({
    icon: 'success',
    title: 'Datos Actualizados Correctamente',
    showConfirmButton: false,
    timer: 2500
  })
  await location.reload();

}


  title = 'csv-files-frontend';
}
