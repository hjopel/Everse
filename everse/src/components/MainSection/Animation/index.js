import React, { useRef, Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber';
import { shaderMaterial, OrbitControls } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro';
import Font from './Arrow_Serif.json';
import { Text } from "troika-three-text";
import gsap from 'gsap';
extend({ Text });
const BlobShaderMaterial = shaderMaterial(
    //Uniform
    {
        uTime: 0,
        uColor: new THREE.Color(0xf5f5f5),
        uFrequency: 3,
        uAmplitude: 2,
        uDensity: 1,
        uStrength: 1,
        uDeepPurple: 1,
        uOpacity: 1,
        uDisplX: 0,
        uDisplY: 0
    },
    //Vertex shader
    glsl`
    #pragma glslify: pnoise = require(glsl-noise/periodic/3d)
    #pragma glslify: rotateY = require(glsl-rotate/rotateY)
    #pragma glslify: cnoise = require(glsl-noise/classic/3d)
    uniform float uFrequency;
    uniform float uAmplitude;
    uniform float uDensity;
    uniform float uStrength;
    uniform float uTime;
    uniform float uDisplX;
    uniform float uDisplY;
    
    varying float vDistortion;
    
    void main() {  
        float distortion = pnoise(normal * uDensity, vec3(10.)) * uStrength * sin(uTime);
        vec3 pos = position;
        
        pos = pos + (normal * distortion);
        float angle = sin(uv.y * uFrequency) * uAmplitude;
        pos = rotateY(pos, angle);    
        
        vDistortion = pnoise(normal * sin(uTime * uStrength) , vec3(10.));
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
    }
    `,
    //Fragment shader
    glsl`
    uniform float uOpacity;
    uniform float uDeepPurple;
    uniform float uDisplX;
    uniform float uDisplY;
    varying float vDistortion;
    uniform float uTime;
    
    vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
      return a + b * cos(6.28318 * (c * t + d));
    }     
    
    void main() {
      float distort = vDistortion;
    
    
      vec3 color = cosPalette(distort,vec3(1.00,1.00,1.00),vec3(1.00,1.00,1.00),vec3(1.00,1.00,1.00),vec3(1.00,1.00,1.00));
        
    
      gl_FragColor = vec4(color, 1.);
    }
    `
);

extend({ BlobShaderMaterial });

const Thing = () => {
    const ref = useRef();
    useFrame(({ mouse, clock }) => {
        ref.current.uTime = clock.getElapsedTime();
        ref.current.uDisplX = mouse.x;
        ref.current.uDisplY = mouse.y;
    });


    return (
        <mesh>
            <icosahedronBufferGeometry args={[1, 64]} attach="geometry" />
            <blobShaderMaterial ref={ref} attach="material" />
        </mesh>
    );
}

const TextShaderMaterial = shaderMaterial(
    //Uniform
    {
    },
    //Vertex shader
    glsl`
    #pragma glslify: snoise = require(glsl-noise/simplex/3d)
    //https://github.com/cabbibo/glsl-curl-noise/blob/master/curl.glsl
    vec3 snoiseVec3( vec3 x ){

        float s  = snoise(vec3( x ));
        float s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));
        float s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));
        vec3 c = vec3( s , s1 , s2 );
        return c;

    }


    vec3 curlNoise( vec3 p ){
    
        const float e = .1;
        vec3 dx = vec3( e   , 0.0 , 0.0 );
        vec3 dy = vec3( 0.0 , e   , 0.0 );
        vec3 dz = vec3( 0.0 , 0.0 , e   );

        vec3 p_x0 = snoiseVec3( p - dx );
        vec3 p_x1 = snoiseVec3( p + dx );
        vec3 p_y0 = snoiseVec3( p - dy );
        vec3 p_y1 = snoiseVec3( p + dy );
        vec3 p_z0 = snoiseVec3( p - dz );
        vec3 p_z1 = snoiseVec3( p + dz );

        float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
        float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
        float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;

        const float divisor = 1.0 / ( 2.0 * e );
        return normalize( vec3( x , y , z ) * divisor );

    }
    void main() {  
        gl_PointSize = 0.1;

        vec3 distortion = curlNoise(vec3(position.x, position.y,0.)) ;
        vec3 finalPos = position + distortion;
        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);


	    gl_Position = projectionMatrix * modelViewPosition;
    }
    `,
    //Fragment shader
    glsl`
     
    
    void main() {
      gl_FragColor = vec4(1.0,1.0,1.0,1.0);
    }
    `
);

extend({ TextShaderMaterial });

const TextAnimation = () => {
    const font = new THREE.FontLoader().parse(Font);
    const writing = "everse.";

    return (
        <text
            position-z={-180}
            text={writing}
            font={"https://fonts.gstatic.com/s/trocchi/v6/qWcqB6WkuIDxDZLcPrxeuw.woff"}
            anchorX="center"
            anchorY="middle"
            fontSize="12"
            lineHeight="1"
            textAlign="justify"
        >
            <textShaderMaterial attach="material" color={"#99ccff"} />
        </text>
    )
}

const LogoShaderMaterial = shaderMaterial(
    //Uniform
    {
        uTexture: new THREE.Texture(),
        uTime: 0,
        uDistortionMultiplier: 0
    },
    //Vertex shader
    glsl`
    #pragma glslify: snoise = require(glsl-noise/simplex/3d)
    //https://github.com/cabbibo/glsl-curl-noise/blob/master/curl.glsl
    vec3 snoiseVec3( vec3 x ){

        float s  = snoise(vec3( x ));
        float s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));
        float s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));
        vec3 c = vec3( s , s1 , s2 );
        return c;

    }


    vec3 curlNoise( vec3 p ){
    
        const float e = .1;
        vec3 dx = vec3( e   , 0.0 , 0.0 );
        vec3 dy = vec3( 0.0 , e   , 0.0 );
        vec3 dz = vec3( 0.0 , 0.0 , e   );

        vec3 p_x0 = snoiseVec3( p - dx );
        vec3 p_x1 = snoiseVec3( p + dx );
        vec3 p_y0 = snoiseVec3( p - dy );
        vec3 p_y1 = snoiseVec3( p + dy );
        vec3 p_z0 = snoiseVec3( p - dz );
        vec3 p_z1 = snoiseVec3( p + dz );

        float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
        float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
        float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;

        const float divisor = 1.0 / ( 2.0 * e );
        return normalize( vec3( x , y , z ) * divisor );

    }

    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uDistortionMultiplier;
    varying vec2 vUv;
    void main() {  
        vUv = uv;
        gl_PointSize = 2.;
        vec3 distortion = vec3(position.x * 2., position.y, 1.) * curlNoise(vec3(
            position.x * 0.7 , 
            position.y * 0.7 + uTime*0.1,
            (position.x * position.y)*0.02)) * uDistortionMultiplier;
        vec3 finalPos = position + distortion;
        vec4 modelViewPosition = modelViewMatrix * vec4(finalPos, 1.0);


	    gl_Position = projectionMatrix * modelViewPosition;
    }
    `,
    //Fragment shader
    glsl`
    varying vec2 vUv;
    uniform sampler2D uTexture;
    
    void main() {
        vec3 texture = texture2D(uTexture, vUv).rgb;
        gl_FragColor = vec4(texture, 1.0);
        if(texture.r < 0.1 && texture.g < 0.1 && texture.b < 0.1) discard;
    }
    `
);

extend({ LogoShaderMaterial });

const LogoAnimation = () => {
    const [image] = useLoader(THREE.TextureLoader, ["everse.png"]);
    // const [image] = useLoader(THREE.TextureLoader, ["code.jpg"]);
    const ref = useRef();
    useFrame(({ clock }) => {
        const elapsed = clock.getElapsedTime();
        ref.current.uTime = elapsed;
    })
    useEffect(()=>{
        const t1 = gsap.timeline();
        t1.fromTo(ref.current, {uDistortionMultiplier: 0.1}, { delay: 1,duration: 3, uDistortionMultiplier: 7});
        t1.to(ref.current, {duration: 2 ,uDistortionMultiplier: 0});
    })

    return (
        <>
            <points>
                <planeBufferGeometry args={[1.33 * 5, 1 * 5, 1890 / 8, 1417 / 8]} attach="geometry" />
                {/* <planeBufferGeometry args={[1280/853, 1, 1280/4, 853/4]} attach="geometry" /> */}
                <logoShaderMaterial attach="material" uTexture={image} ref={ref} />
            </points>
        </>
    )
}
const Animation = () => {
    return (
        <>
            <Scene />
        </>
    )
};

const Scene = () => {
    return (
        <>
            <Canvas camera={[0, 0, 0]}>
                {/* <OrbitControls enablePan={true} enableZoom={true} /> */}
                <Suspense fallback={null}>
                    {/* <Thing /> */}
                    {/* <TextAnimation /> */}
                    <LogoAnimation />
                </Suspense>
            </Canvas>
        </>
    )
};

export default Animation;
