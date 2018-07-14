import { Component, OnInit , ViewChild ,ElementRef} from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { MouseEvent } from '@agm/core';

// Get Location Service
import { GetLocationService } from '../get-location.service'
import { QueryService } from '../query.service';

@Component({
  selector: 'app-login-guest',
  templateUrl: './login-guest.component.html',
  styleUrls: ['./login-guest.component.css']
})

export class LoginGuestComponent implements OnInit{
  // Access the Dom Element ("Lable") 
  @ViewChild('viewRef') viewRef: ElementRef;
  // @ViewChild('idBtn') idBtn: ElementRef;

  guestUser:object; // contains the id of the user devices 
  userCoordinates:object; // contains the lat and lng of the user location 
  nearByPlaces:Array<object>; // contains all the nearby places 
  nearByPlacesInfo:Array<object>  
  zoom: number =16; // google maps zoom level
  // initial center position for the map
  lat: number = JSON.parse(localStorage.getItem('latitude'));
  lng: number = JSON.parse(localStorage.getItem('longitude')); 
  yourPosition:string = "You Here" // user current position lable
  markers: marker[]  // Array of type interface marker hold data about the place
  isMap:boolean // show the map view status 

  constructor
  (
    public location:GetLocationService, //get instance from GetLocation Service
    private Query:QueryService // Inject Query service
  ) 
  {
      this.location.getLocation() // Call GetLocation Function from the service
      this.nearByPlacesInfo=[{}]
      // this.getDeviceId(1234567890) // Call getDeviceId Function
      // set initial values
      this.markers=[]
      this.isMap = false;
   }

   // getDeviceId Function and send it to the path
   getDeviceId(id, idBtn , input , togelBtn)
   {
    console.log(togelBtn)
     let path = 'https://backend-user-alb.qurba-dev.com/auth/login-guest/'
     this.guestUser =
     {
       "payload":{
         "deviceId":id.toString()
       }
     }
     // send guestUser object to the server with post request
     this.Query.postReq(path,this.guestUser).subscribe(
       res =>{
        idBtn.style.display="none"
        input.style.display="inline-block"
        togelBtn.style.display="inline-block"
         let token = res.response.payload.jwt
         localStorage.setItem('TokenForGuest',token) //save the token in the localstorage
         this.getNearBy(token) // call getNearBy function
       },
       err =>
       {
         alert("Error")
       }
     )
   } 

  // getNearBy function -- send the token to make sure the user is Authorized 
   getNearBy(token){
    let path = 'https://backend-user-alb.qurba-dev.com/places/places/nearby?page=1';
    this.userCoordinates =
     {
       "payload":{
         "lng": JSON.parse(localStorage.getItem('longitude')),
         "lat": JSON.parse(localStorage.getItem('latitude'))
       }
     }
     this.Query.postReq(path,this.userCoordinates,
      {
        headers : new HttpHeaders({'Authorization':`JWT ${token}`})
      }
    )
    .subscribe(
       res =>{
         this.nearByPlaces= res.response.payload 
         // To add place's info on the map marker  
        for (const key in this.nearByPlaces) {
          this.markers.push({
            'lat' : this.nearByPlaces[key]['location']['coordinates'][1],
            'lng' : this.nearByPlaces[key]['location']['coordinates'][0],
            'label' : this.nearByPlaces[key]['name'],
            'phoneNo':this.nearByPlaces[key]['mobileNumber'],
            'about':this.nearByPlaces[key]['about']
          })
        }     
       },
       err =>
       {
         alert("please change your browser setting to allow us detect your location")
       }
     )
   }

   // Function to toggel between map view and card view 
   // mapStatus to represent is Map = true 
   toggelFunc(mapStatus)
    {
    if(!mapStatus)
      {
        // To change the innerText of the Lable element 
        this.viewRef.nativeElement.innerText="Card view"
        this.isMap = true 
      }
      else
      {
        this.viewRef.nativeElement.innerText="Map view"
        this.isMap = false
      }
    }

  
    ngOnInit() { 
   }  
}

// Marker interface for type safety.
interface marker {
	lat: number;
	lng: number;
  label?: string;
  about?:string
  phoneNo?:number
}