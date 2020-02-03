import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as ml5 from 'ml5';

@Component({
  selector: 'app-pose-detection',
  templateUrl: './pose-detection.component.html',
  styleUrls: ['./pose-detection.component.scss']
})
export class PoseDetectionComponent implements OnInit 
{

  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;

  public noseX: number = 0;
  public noseY: number = 0;
  public eyeX: number = 0;
  public eyeY: number = 0;
  public ctx: any;
  public poses: any;
  public poseNet: any;
  public brain: any;
  public showVideo: boolean = false;

  public constructor() { }

  public ngOnInit() 
  {

  }


  public setup()
  {
    try
    {
        this.showVideo = true;
        if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) 
        {
          navigator.mediaDevices.getUserMedia({ video: true }).then( (stream) =>
          {
            console.log(stream)
            this.video.nativeElement.srcObject =stream;
            this.video.nativeElement.play();
            this.ctx = this.canvas.nativeElement.getContext('2d');
            this.drawCameraIntoCanvas();
            this.poseNet = ml5.poseNet(this.video.nativeElement, ()=>{ this.modelReady()});
            this.poseNet.on('pose', (poses)=>{ this.gotPoses(poses)});
            
       //     this.buildNeuralNet();
          });
        }
     // });
    }
    catch( e )
    {
      console.log( e );
    }
    
  }

  pause()
  {
    this.video.nativeElement.pause();
  }

  play(){
    this.video.nativeElement.play();
  }
//squad, lunge, plank, twist ruso
  public buildNeuralNet(): void 
  {/*
    let options ={
      inputs: 34,
      outputs: 4,
      task: 'classification',
      debug: true
    }

    this.brain = ml5.neuralNetwork(options);*/
  }

  public drawCameraIntoCanvas() {
     // Draw the video element into the canvas

    this.ctx.drawImage(this.video.nativeElement, 0, 0, 640, 480);

    // We can call both functions to draw all keypoints and the skeletons
    this.drawKeypoints();
    this.drawSkeleton();
    window.requestAnimationFrame(()=>{ this.drawCameraIntoCanvas()});
  }

  // A function that gets called every time there's an update from the model
  public gotPoses(results) 
  {
    this.poses = results;
  }
  
  public modelReady() 
  {
    console.log("model ready")
    this.poseNet.singlePose(this.video)
  }
  
  // A function to draw ellipses over the detected keypoints
  public drawKeypoints()  
  {
    if(this.poses)
    {  
      // Loop through all the poses detected
      for (let i = 0; i < this.poses.length; i++) {
        // For each pose detected, loop through all the keypoints
        for (let j = 0; j < this.poses[i].pose.keypoints.length; j++) {
          let keypoint = this.poses[i].pose.keypoints[j];
          // Only draw an ellipse is the pose probability is bigger than 0.2
          if (keypoint.score > 0.2) {
            this.ctx.beginPath();
            this.ctx.arc(keypoint.position.x, keypoint.position.y, 10, 0, 2 * Math.PI);
            this.ctx.stroke();
          }
        }
      }
    }
  }
  
  // A function to draw the skeletons
  public drawSkeleton() 
  {
    if( this.poses )
    {
      // Loop through all the skeletons detected
      for (let i = 0; i < this.poses.length; i++) {
        // For every skeleton, loop through all body connections
        for (let j = 0; j < this.poses[i].skeleton.length; j++) {
          let partA = this.poses[i].skeleton[j][0];
          let partB = this.poses[i].skeleton[j][1];
          this.ctx.beginPath();
          this.ctx.moveTo(partA.position.x, partA.position.y);
          this.ctx.lineTo(partB.position.x, partB.position.y);
          this.ctx.stroke();
        }
      }
    }
  }


}
