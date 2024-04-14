This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Perimeter Technical Exercise

A repository showcasing a basic MapGL map with polygon functionality for the Perimeter Technical Exercise. The final product should utilize MapGL to allow for map movement and robust polygon creation with interactive points.

## Techstack

![Technologies](https://skillicons.dev/icons?i=js,react,nextjs,mongodb)

## Screenshot

![Site screenshot](/public/assets/screenshot.jpeg)

## Usage

### Usage Instructions

-   Ensure you've allowed geolocation in your browser or the default location will be set to London.
-   To make markers on the map, simply click/tap. All markers are draggable.
-   To save polygons, have at least 3 polygons and a name.
-   Saved polygons can be edited by saving a new polygon with the same name

### Installation Instructions

Deployed application can be found at the following link: [Website link](https://perimeter-technical.vercel.app)

Repository can be installed by running the following commands:

```console
git clone git@github.com:Fy50167/perimeter-technical.git
npm install
npm run dev
```

To run the code locally, create a .env.local file and add the following environmental variables:

-   NEXT_PUBLIC_ACCESS_TOKEN
-   MONGODB_URL

The access token can be sourced from your Mapbox GL account while the MongoDB URL can be obtained from your cluster setup on MongoDB Atlas.

## Contact

Contact me via email: fy50167@gmail.com  
Or through my website at: francisyang.com
