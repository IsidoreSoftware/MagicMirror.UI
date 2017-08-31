import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  templateUrl: './camera.component.html'
})
export class CameraComponent implements OnInit {
    @ViewChild('videoScreen')
    videoScreen: ElementRef;

    ngOnInit(): void {
        navigator.getUserMedia({video: true},
            (stream) => {
                this.videoScreen.nativeElement.src = URL.createObjectURL(stream);
            },
            () => {
                alert('could not connect stream');
            }
        );
    }
}
