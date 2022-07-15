import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Observable, Subject, onErrorResumeNext } from 'rxjs';
import { UtilService } from 'src/app/services/util/util.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { FEED } from '../../consts/routes.const';
import { MEDIA_STORAGE_PATH } from 'src/app/consts/storage.const';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, OnDestroy {
  destroy$: Subject<null> = new Subject();
  fileToUpload: File;
  videoForm: FormGroup;
  veedLoads: string | ArrayBuffer;
  submitted = false;
  task: AngularFireUploadTask;
  percentage: Observable<any>;
  snapshot: Observable<any>;
  user: firebase.User;
  downloadURL: AngularFirestoreCollection<any>;

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly storageService: StorageService,
    private readonly utilService: UtilService,
    private readonly storage: AngularFireStorage,
    private readonly afs: AngularFirestore,
  ) {}

  ngOnInit(): void {
    this.videoForm = this.formBuilder.group({
      video: [null, [Validators.required, this.video.bind(this)]],
      description: [null, Validators.required],
    });
    this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => (this.user = user));
    this.videoForm
      .get('video')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((newValue) => {
        this.handleFileChange(newValue.files);
      });
  }
  // handle file upload changes
  handleFileChange([veeds]) {
    this.fileToUpload = veeds;
    const reader = new FileReader();
    reader.onload = (loadEvent) => (this.veedLoads = loadEvent.target.result);
    reader.readAsDataURL(veeds);
  }

  // handles upload task
  upload() {
    this.submitted = true;
    const { name } = this.fileToUpload;
    const path = `${MEDIA_STORAGE_PATH}/${this.user.email}/media/${name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.fileToUpload);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.task
      .snapshotChanges()
      .pipe(
        tap(),
        finalize(async () => {
          this.downloadURL = await ref.getDownloadURL().toPromise();
          this.afs.collection('veeds').add({ downloadURL: this.downloadURL, path });
          this.router.navigate([`${FEED}`]);
          console.log(this.downloadURL);
        }),
      )
      .subscribe();
  }

  // check if file is ok with requires extention
  private video(videoControl: AbstractControl): { [key: string]: boolean } | null {
    if (videoControl.value) {
      const [veeds] = videoControl.value.files;
      return this.utilService.validateFile(veeds)
        ? null
        : {
            video: true,
          };
    }
    return;
  }

  // reset form page
  ngOnDestroy() {
    this.destroy$.next(null);
  }
}
