import { Component,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup,FormArray,Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-control-statement',
  templateUrl: './edit-control-statement.component.html',
  styleUrls: ['./edit-control-statement.component.scss']
})
export class EditControlStatementComponent {
isPanelVisible: boolean = false;
  dynamicForm: FormGroup;
  source: FormGroup;
  iCount:any=1;
  bCount:any=1;
  @ViewChild('fileAttachInput') fileAttachInput!: ElementRef;
  fileAttach: File[]  = [];
  weblink:string[] =[];
  isfileAttachUploaded = false;
  maxFiles: number = 1; // default value
maxSize: number = 5 ; // default 5MB in bytes

maxDocuments: number = 1;  // Default value
  maxSizeInMB: number = 5;   // Default value
  allowedFileTypes: string = '';
  FileTypes: string = '';
  

  constructor(private fb: FormBuilder,
    private router: Router) {
    this.dynamicForm = this.fb.group({
      fields: this.fb.array([]),
    });
    this.source = this.fb.group({
      references: this.fb.array([this.createReference()])
    });
  }
  
  createField(): FormGroup {
    return this.fb.group({
      additionalsub: ['', Validators.required],
      checkboxField2: [false],
      dependentid: [{ value: '', disabled: true }, Validators.required]
    });
  }
  createReference(): FormGroup {
    return this.fb.group({
      referenceType: [''],
      referencetypeValue: [''],
      file_attachment: ['']
    });
  }
  get fields(): FormArray {
    return this.dynamicForm.get('fields') as FormArray;
  }
  addField() { 
    this.iCount++;
    if(this.fields.length<99) {
    const field = this.createField();
    this.fields.push(field);

    field.get('checkboxField2')?.valueChanges.subscribe((checked: boolean) => {
      const dependentField = field.get('dependentid');
      if (checked) {
        dependentField?.enable();  
      } else {
        dependentField?.disable();  
      }
    });}
  }
  removeField(index: number) {
    this.iCount--;
    this.fields.removeAt(index);
  }
  onCheckboxChange(event:any) {
    console.log('Sub-Control Checked:', event.target.checked);
  this.isPanelVisible = event.target.checked;
  }

  onMainFileSelected(event: any,referenceIndex: number) {
    const file: File = event.target.files[0]; // Assuming you only want one file for the mainFile
    if (file) {
      if (file.size > this.maxSize * 1024 * 1024) {
      //  this.mainErrorMessage = `The file ${file.name} exceeds the size limit of ${this.maxSize}MB.`;
        return;
      }
      // Check for allowed file types here if necessary
      this.fileAttach.push(file);
      const referenceFormGroup = this.references.controls[referenceIndex] as FormGroup;
      referenceFormGroup.get('file_attachment')?.setValue(file.name);
      console.log('Form Value:', referenceFormGroup.value);
     // this.mainErrorMessage = ''; 
     // this.isMainFileUploaded = true; // Reset any previous errors
    }
  }
  
   // Method to handle web link input
   onWebLinkInput(weblink: string) {
    // Validate the web link format
    alert(weblink)
    const pattern: RegExp = /^(https?:\/\/)?(www\.)?[a-z0-9]+\.[a-z]{2,}\/?/;
    if (!pattern.test(weblink)) {
      // Handle invalid web link format
      // For example:
      // this.weblinkErrorMessage = 'Invalid web link format. Please enter a valid URL starting with "https://www."';
      return;
    }
  
    // Web link is valid, assign it to the variable
    this.weblink .push(weblink);
  }
  onReferenceTypeChange(defaultValue:string,j:number): void {
    const selectedValue = defaultValue;
    //alert(selectedValue)
    const referenceType = this.source.get('referenceType')?.value;
    const additionalReferences = this.source.get('additionalReferences') as FormArray;
    additionalReferences.clear();
    if (additionalReferences.length < 4) {
      if (selectedValue === 'weblink') {
        additionalReferences.push(this.createReferenceControl('weblink'));
      
      } else if (selectedValue === 'file') {
        additionalReferences.push(this.createReferenceControl('file'));
      }
    } else {
     // alert('Maximum limit reached for additional references');
    }
  }
  createReferenceControl(type: string): FormGroup {
    if (type === 'weblink') {
        return this.fb.group({
            type: [type],
            value: ['']
        });
    } else if (type === 'file') {
        return this.fb.group({
            type: [type],
            value: [''], // For storing the file name (if needed)
            fileValue: [''] // For storing the actual file (if needed)
        });
    }

    // Default case when type is neither 'weblink' nor 'file'
    return this.fb.group({
        type: [''],
        value: ['']
    });
}
  addReferenceField(): void {
    if(this.bCount<=4){this.bCount++;} else{}
 
    if(this.references.length<5){
     const referenceGroup = this.createReference(); 
     this.references.push(referenceGroup);
   }
     else{
       alert("Only 5 Add References need to be Add")
     }
     
  //this.parentRows.push({referenceType:''});
  
   }
   removeReferenceField(index:number){
    if(this.bCount<0){} else{
      this.bCount--;
    }
     this.references.removeAt(index);
   }
  get references(): FormArray {
    return this.source.get('references') as FormArray;
  }

  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  Cancel(){
    this.reloadComponent();
  }
}
