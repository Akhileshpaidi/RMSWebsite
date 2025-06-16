import { Component,ViewChild,ElementRef,ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup,FormArray,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-create-control-document', 
  templateUrl: './create-control-document.component.html',
  styleUrls: ['./create-control-document.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateControlDocumentComponent {
 isPanelVisible: boolean = false;
  subControlForm: FormGroup;
  source: FormGroup;
  controlExceptionForm: FormGroup;
  iCount:any=1;
  bCount:any=1;
  exceptionCount:any=1;
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
  repeatReview: string = 'No';
  isReviewRequiredChecked: boolean | null | undefined = false;
  isMapKeyChecked: boolean | null | undefined = false;
  is1Checked: boolean | null | undefined = false;
  is2Checked: boolean | null | undefined = false;
  is3Checked: boolean | null | undefined = false;
  exceptionsRequired: boolean | null | undefined = false;
  isMobile: boolean = false; 
  
  constructor(private fb: FormBuilder,
    private router: Router,private breakpointObserver: BreakpointObserver,private cdr: ChangeDetectorRef) {
    this.subControlForm = this.fb.group({
      fields: this.fb.array([]),
    });
    this.source = this.fb.group({
      references: this.fb.array([this.createReference()])
    });
    this.controlExceptionForm = this.fb.group({
      exceptions: this.fb.array([this.createExceptionField()]),
    });
    
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  ngAfterViewInit() {
    document.body.offsetHeight;
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }
  
  
  createField(): FormGroup {
    return this.fb.group({
      additionalsub: ['', Validators.required],
      isDependentField: [false],
      dependentid: [{ value: '', disabled: true }, Validators.required]
    });
  }
  createExceptionField(): FormGroup {
    return this.fb.group({
      controlsummary: ['', Validators.required],
      controldetails: ['', Validators.required],
      approveddate: ['', Validators.required],
      validdate: ['', Validators.required],
      validtilldate: ['', Validators.required],
      status: ['', Validators.required],
      uploaddetails: ['', Validators.required],
      uploadapproval: ['', Validators.required],
      exceptionowner: ['', Validators.required],
      exceptionapprover: ['', Validators.required],
      
    });
  }
  createReference(): FormGroup {
    return this.fb.group({
      referenceType: [''],
      referencetypeValue: [''],
      file_attachment: ['']
    });
  }
  get exceptions(): FormArray {
    return this.controlExceptionForm.get('exceptions') as FormArray;
  }
  addExceptionField() { 
    if(this.exceptions.length<5){this.exceptionCount++;} else {}

    if(this.exceptions.length<5) {
    const exceptionfield = this.createExceptionField();
    this.exceptions.push(exceptionfield);}
    else{
      alert("Only 5 Add References need to be Add")
    }
  }
  get fields(): FormArray {
    return this.subControlForm.get('fields') as FormArray;
  }
  addField() { 
    this.iCount++;
    if(this.fields.length<5) {
    const field = this.createField();
    this.fields.push(field);
    this.cdr.markForCheck();
    
    field.get('isDependentField')?.valueChanges.subscribe((checked: boolean) => {
      const dependentField = field.get('dependentid');
      if (checked) {
        dependentField?.enable();  
      } else {
        dependentField?.disable();  
      }
    });}
    else{
      alert("Only 100 sub-controls can be added ")
    }
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
