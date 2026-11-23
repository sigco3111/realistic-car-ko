const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./yard-DcsZ335f.js","./yard-CcYH6mNM.js"])))=>i.map(i=>d[i]);
import{$ as e,$n as t,A as n,At as r,B as i,Bn as a,Bt as o,C as s,Cn as c,Ct as l,D as u,Dn as d,Dt as f,E as p,En as m,Et as h,F as g,Fn as _,Ft as v,G as y,Gn as b,Hn as x,Ht as S,I as C,In as w,It as T,J as E,Jn as D,K as O,Kn as k,Kt as ee,L as A,Ln as te,Lt as j,M as ne,Mt as M,N,Nt as P,O as re,On as ie,Ot as ae,P as oe,Pn as se,Pt as ce,Q as F,R as I,Rt as L,S as le,St as ue,T as de,Tn as R,Tt as fe,U as pe,Un as z,V as me,Vn as he,W as ge,Wn as _e,Y as ve,Yn as ye,Z as be,Zn as xe,_ as Se,_r as Ce,_t as B,a as V,ar as we,at as Te,b as Ee,br as De,bt as Oe,c as H,cr as ke,ct as Ae,d as je,dr as Me,dt as U,er as Ne,et as W,f as Pe,fr as Fe,ft as Ie,gr as Le,gt as Re,h as ze,hr as Be,ht as Ve,i as He,ir as G,it as Ue,j as We,jt as Ge,k as Ke,kn as qe,kt as Je,l as Ye,lr as Xe,lt as Ze,m as K,mr as Qe,mt as $e,n as et,nr as tt,nt,o as rt,or as it,ot as at,p as ot,pr as st,pt as ct,q as lt,qn as ut,qt as dt,r as ft,rr as pt,rt as mt,sr as ht,st as gt,t as _t,tr as vt,tt as yt,u as bt,ur as xt,ut as St,v as Ct,vr as wt,vt as Tt,w as Et,wn as Dt,wt as Ot,x as kt,xt as At,y as q,yr as jt,yt as Mt,z as Nt,zn as Pt,zt as Ft}from"./yard-CcYH6mNM.js";function It(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Lt(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var J={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Y={common:{diffuse:{value:new q(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new B},alphaMap:{value:null},alphaMapTransform:{value:new B},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new B}},envmap:{envMap:{value:null},envMapRotation:{value:new B},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new B}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new B}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new B},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new B},normalScale:{value:new pt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new B},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new B}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new B}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new B}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new q(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new G},probesMax:{value:new G},probesResolution:{value:new G}},points:{diffuse:{value:new q(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new B},alphaTest:{value:0},uvTransform:{value:new B}},sprite:{diffuse:{value:new q(16777215)},opacity:{value:1},center:{value:new pt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new B},alphaMap:{value:null},alphaMapTransform:{value:new B},alphaTest:{value:0}}},Rt={basic:{uniforms:Ce([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.fog]),vertexShader:J.meshbasic_vert,fragmentShader:J.meshbasic_frag},lambert:{uniforms:Ce([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,Y.lights,{emissive:{value:new q(0)},envMapIntensity:{value:1}}]),vertexShader:J.meshlambert_vert,fragmentShader:J.meshlambert_frag},phong:{uniforms:Ce([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,Y.lights,{emissive:{value:new q(0)},specular:{value:new q(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:J.meshphong_vert,fragmentShader:J.meshphong_frag},standard:{uniforms:Ce([Y.common,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.roughnessmap,Y.metalnessmap,Y.fog,Y.lights,{emissive:{value:new q(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:J.meshphysical_vert,fragmentShader:J.meshphysical_frag},toon:{uniforms:Ce([Y.common,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.gradientmap,Y.fog,Y.lights,{emissive:{value:new q(0)}}]),vertexShader:J.meshtoon_vert,fragmentShader:J.meshtoon_frag},matcap:{uniforms:Ce([Y.common,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,{matcap:{value:null}}]),vertexShader:J.meshmatcap_vert,fragmentShader:J.meshmatcap_frag},points:{uniforms:Ce([Y.points,Y.fog]),vertexShader:J.points_vert,fragmentShader:J.points_frag},dashed:{uniforms:Ce([Y.common,Y.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:J.linedashed_vert,fragmentShader:J.linedashed_frag},depth:{uniforms:Ce([Y.common,Y.displacementmap]),vertexShader:J.depth_vert,fragmentShader:J.depth_frag},normal:{uniforms:Ce([Y.common,Y.bumpmap,Y.normalmap,Y.displacementmap,{opacity:{value:1}}]),vertexShader:J.meshnormal_vert,fragmentShader:J.meshnormal_frag},sprite:{uniforms:Ce([Y.sprite,Y.fog]),vertexShader:J.sprite_vert,fragmentShader:J.sprite_frag},background:{uniforms:{uvTransform:{value:new B},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:J.background_vert,fragmentShader:J.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new B}},vertexShader:J.backgroundCube_vert,fragmentShader:J.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:J.cube_vert,fragmentShader:J.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:J.equirect_vert,fragmentShader:J.equirect_frag},distance:{uniforms:Ce([Y.common,Y.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:J.distance_vert,fragmentShader:J.distance_frag},shadow:{uniforms:Ce([Y.lights,Y.fog,{color:{value:new q(0)},opacity:{value:1}}]),vertexShader:J.shadow_vert,fragmentShader:J.shadow_frag}};Rt.physical={uniforms:Ce([Rt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new B},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new B},clearcoatNormalScale:{value:new pt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new B},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new B},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new B},sheen:{value:0},sheenColor:{value:new q(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new B},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new B},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new B},transmissionSamplerSize:{value:new pt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new B},attenuationDistance:{value:0},attenuationColor:{value:new q(0)},specularColor:{value:new q(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new B},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new B},anisotropyVector:{value:new pt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new B}}]),vertexShader:J.meshphysical_vert,fragmentShader:J.meshphysical_frag};var zt={r:0,b:0,g:0},Bt=new Tt,Vt=new B;Vt.set(-1,0,0,0,1,0,0,0,1);function Ht(e,t,n,r,i,a){let o=new q(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Mt(new ot(1,1,1),new te({name:`BackgroundCubeMaterial`,uniforms:xt(Rt.backgroundCube.uniforms),vertexShader:Rt.backgroundCube.vertexShader,fragmentShader:Rt.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Bt.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Vt),l.material.toneMapped=Ee.getTransfer(i.colorSpace)!==_,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Mt(new ce(2,2),new te({name:`BackgroundMaterial`,uniforms:xt(Rt.background.uniforms),vertexShader:Rt.background.vertexShader,fragmentShader:Rt.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Ee.getTransfer(i.colorSpace)!==_,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(zt,Be(e)),n.buffers.color.setClear(zt.r,zt.g,zt.b,r,a)}function v(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:v}}function Ut(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Wt(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Gt(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(jt(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&jt(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Kt(e){let t=this,n=null,r=0,i=!1,a=!1,o=new P,s=new B,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var qt=4,Jt=6,Yt=20,Xt=256,Zt=new Ge,Qt=new q,$t=null,en=0,tn=0,nn=!1,rn=new G,an=new G,on=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=rn}=i;$t=this._renderer.getRenderTarget(),en=this._renderer.getActiveCubeFace(),tn=this._renderer.getActiveMipmapLevel(),nn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pn(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fn(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget($t,en,tn),this._renderer.xr.enabled=nn,e.scissorTest=!1,ln(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),$t=this._renderer.getRenderTarget(),en=this._renderer.getActiveCubeFace(),tn=this._renderer.getActiveMipmapLevel(),nn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:gt,minFilter:gt,generateMipmaps:!1,type:ge,format:ee,colorSpace:St,depthBuffer:!1},r=cn(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cn(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=sn(r)),this._blurMaterial=dn(r,e,t),this._ggxMaterial=un(r,e,t)}return r}_compileMaterial(e){let t=new Mt(new ze,e);this._renderer.compile(t,Zt)}_sceneToCubeUV(e,t,n,r,i){let a=new M(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Qt),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Mt(new ot,new Oe({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Qt),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;ln(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=pn()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fn());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;ln(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Zt)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-qt?n-d+qt:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,ln(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Zt),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,ln(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Zt)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];ln(t,3*l*(r>this._lodMax-qt?r-this._lodMax+qt:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Zt)}};function sn(e){let t=[],n=[],r=e,i=e-qt+1+Jt;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?an.set(1,r,n):e===1?an.set(-n,1,-r):e===2?an.set(-n,r,1):e===3?an.set(-1,r,-n):e===4?an.set(-n,-1,r):an.set(n,r,-1),an.toArray(l,(e*6+t)*3)}}let u=new ze;u.setAttribute(`position`,new K(c,3)),u.setAttribute(`outputDirection`,new K(l,3)),n.push(new Mt(u,null)),r>qt&&r--}return{lodMeshes:n,sizeLods:t}}function cn(e,t,n){let r=new ke(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function ln(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function un(e,t,n){return new te({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Xt,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:mn(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function dn(e,t,n){return new te({name:`SphericalGaussianBlur`,defines:{SAMPLES:Yt,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:mn(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function fn(){return new te({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:mn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function pn(){return new te({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:mn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function mn(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var hn=class extends ke{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new s(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ot(5,5,5),i=new te({name:`CubemapFromEquirect`,uniforms:xt(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Mt(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=gt),new kt(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function gn(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new hn(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new on(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new on(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function _n(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&De(`WebGLRenderer: `+e+` extension not supported.`),t}}}function vn(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?ut:k)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function yn(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function bn(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:st(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function xn(e,t,n){let r=new WeakMap,i=new we;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let m=o.attributes.position.count*f,h=1;m>t.maxTextureSize&&(h=Math.ceil(m/t.maxTextureSize),m=t.maxTextureSize);let g=new Float32Array(m*h*4*u),_=new p(g,m,h,u);_.type=Nt,_.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=m*h*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),g[d+s+0]=i.x,g[d+s+1]=i.y,g[d+s+2]=i.z,g[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),g[d+s+4]=i.x,g[d+s+5]=i.y,g[d+s+6]=i.z,g[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),g[d+s+8]=i.x,g[d+s+9]=i.y,g[d+s+10]=i.z,g[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new pt(m,h)},r.set(o,d);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Sn(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Cn={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function wn(e,t,n,r,i,a){let o=new ke(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new ze;l.setAttribute(`position`,new I([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new I([0,2,0,0,2,0],2));let u=new R({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Mt(l,u),f=new Ge(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new ke(t,n,{type:ge,depthBuffer:!1,stencilBuffer:!1}),c=new ke(t,n,{type:ge,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Ee.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Cn[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Tn=new _e,En=new We(1,1),Dn=new p,On=new de,kn=new s,An=[],jn=[],Mn=new Float32Array(16),Nn=new Float32Array(9),Pn=new Float32Array(4);function Fn(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=An[i];if(a===void 0&&(a=new Float32Array(i),An[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function In(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Ln(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Rn(e,t){let n=jn[t];n===void 0&&(n=new Int32Array(t),jn[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function zn(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Bn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(In(n,t))return;e.uniform2fv(this.addr,t),Ln(n,t)}}function Vn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(In(n,t))return;e.uniform3fv(this.addr,t),Ln(n,t)}}function Hn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(In(n,t))return;e.uniform4fv(this.addr,t),Ln(n,t)}}function Un(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(In(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ln(n,t)}else{if(In(n,r))return;Pn.set(r),e.uniformMatrix2fv(this.addr,!1,Pn),Ln(n,r)}}function Wn(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(In(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ln(n,t)}else{if(In(n,r))return;Nn.set(r),e.uniformMatrix3fv(this.addr,!1,Nn),Ln(n,r)}}function Gn(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(In(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ln(n,t)}else{if(In(n,r))return;Mn.set(r),e.uniformMatrix4fv(this.addr,!1,Mn),Ln(n,r)}}function Kn(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function qn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(In(n,t))return;e.uniform2iv(this.addr,t),Ln(n,t)}}function Jn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(In(n,t))return;e.uniform3iv(this.addr,t),Ln(n,t)}}function Yn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(In(n,t))return;e.uniform4iv(this.addr,t),Ln(n,t)}}function Xn(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Zn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(In(n,t))return;e.uniform2uiv(this.addr,t),Ln(n,t)}}function Qn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(In(n,t))return;e.uniform3uiv(this.addr,t),Ln(n,t)}}function $n(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(In(n,t))return;e.uniform4uiv(this.addr,t),Ln(n,t)}}function er(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(En.compareFunction=n.isReversedDepthBuffer()?518:515,a=En):a=Tn,n.setTexture2D(t||a,i)}function tr(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||On,i)}function nr(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||kn,i)}function rr(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Dn,i)}function ir(e){switch(e){case 5126:return zn;case 35664:return Bn;case 35665:return Vn;case 35666:return Hn;case 35674:return Un;case 35675:return Wn;case 35676:return Gn;case 5124:case 35670:return Kn;case 35667:case 35671:return qn;case 35668:case 35672:return Jn;case 35669:case 35673:return Yn;case 5125:return Xn;case 36294:return Zn;case 36295:return Qn;case 36296:return $n;case 35678:case 36198:case 36298:case 36306:case 35682:return er;case 35679:case 36299:case 36307:return tr;case 35680:case 36300:case 36308:case 36293:return nr;case 36289:case 36303:case 36311:case 36292:return rr}}function ar(e,t){e.uniform1fv(this.addr,t)}function or(e,t){let n=Fn(t,this.size,2);e.uniform2fv(this.addr,n)}function sr(e,t){let n=Fn(t,this.size,3);e.uniform3fv(this.addr,n)}function cr(e,t){let n=Fn(t,this.size,4);e.uniform4fv(this.addr,n)}function lr(e,t){let n=Fn(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function ur(e,t){let n=Fn(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function dr(e,t){let n=Fn(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function fr(e,t){e.uniform1iv(this.addr,t)}function pr(e,t){e.uniform2iv(this.addr,t)}function mr(e,t){e.uniform3iv(this.addr,t)}function hr(e,t){e.uniform4iv(this.addr,t)}function gr(e,t){e.uniform1uiv(this.addr,t)}function _r(e,t){e.uniform2uiv(this.addr,t)}function vr(e,t){e.uniform3uiv(this.addr,t)}function yr(e,t){e.uniform4uiv(this.addr,t)}function br(e,t,n){let r=this.cache,i=t.length,a=Rn(n,i);In(r,a)||(e.uniform1iv(this.addr,a),Ln(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?En:Tn;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function xr(e,t,n){let r=this.cache,i=t.length,a=Rn(n,i);In(r,a)||(e.uniform1iv(this.addr,a),Ln(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||On,a[e])}function Sr(e,t,n){let r=this.cache,i=t.length,a=Rn(n,i);In(r,a)||(e.uniform1iv(this.addr,a),Ln(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||kn,a[e])}function Cr(e,t,n){let r=this.cache,i=t.length,a=Rn(n,i);In(r,a)||(e.uniform1iv(this.addr,a),Ln(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Dn,a[e])}function wr(e){switch(e){case 5126:return ar;case 35664:return or;case 35665:return sr;case 35666:return cr;case 35674:return lr;case 35675:return ur;case 35676:return dr;case 5124:case 35670:return fr;case 35667:case 35671:return pr;case 35668:case 35672:return mr;case 35669:case 35673:return hr;case 5125:return gr;case 36294:return _r;case 36295:return vr;case 36296:return yr;case 35678:case 36198:case 36298:case 36306:case 35682:return br;case 35679:case 36299:case 36307:return xr;case 35680:case 36300:case 36308:case 36293:return Sr;case 36289:case 36303:case 36311:case 36292:return Cr}}var Tr=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ir(t.type)}},Er=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=wr(t.type)}},Dr=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Or=/(\w+)(\])?(\[|\.)?/g;function kr(e,t){e.seq.push(t),e.map[t.id]=t}function Ar(e,t,n){let r=e.name,i=r.length;for(Or.lastIndex=0;;){let a=Or.exec(r),o=Or.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){kr(n,l===void 0?new Tr(s,e,t):new Er(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Dr(s),kr(n,e)),n=e}}}var jr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Ar(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Mr(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Nr=37297,Pr=0;function Fr(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Ir=new B;function Lr(e){Ee._getMatrix(Ir,Ee.workingColorSpace,e);let t=`mat3( ${Ir.elements.map(e=>e.toFixed(4))} )`;switch(Ee.getTransfer(e)){case U:return[t,`LinearTransferOETF`];case _:return[t,`sRGBTransferOETF`];default:return jt(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Rr(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Fr(e.getShaderSource(t),r)}return i}function zr(e,t){let n=Lr(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Br={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Vr(e,t){let n=Br[t];return n===void 0?(jt(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Hr=new G;function Ur(){return Ee.getLuminanceCoefficients(Hr),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Hr.x.toFixed(4)}, ${Hr.y.toFixed(4)}, ${Hr.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Wr(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(qr).join(`
`)}function Gr(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Kr(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function qr(e){return e!==``}function Jr(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Yr(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Xr=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zr(e){return e.replace(Xr,$r)}var Qr=new Map;function $r(e,t){let n=J[t];if(n===void 0){let e=Qr.get(t);if(e!==void 0)n=J[e],jt(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Zr(n)}var ei=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ti(e){return e.replace(ei,ni)}function ni(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function ri(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var ii={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function ai(e){return ii[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var oi={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function si(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:oi[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var ci={302:`ENVMAP_MODE_REFRACTION`};function li(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:ci[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var ui={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function di(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:ui[e.combine]||`ENVMAP_BLENDING_NONE`}function fi(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function pi(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=ai(n),l=si(n),u=li(n),d=di(n),f=fi(n),p=Wr(n),m=Gr(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(qr).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(qr).join(`
`),_.length>0&&(_+=`
`)):(g=[ri(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(qr).join(`
`),_=[ri(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:J.tonemapping_pars_fragment,n.toneMapping===0?``:Vr(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,J.colorspace_pars_fragment,zr(`linearToOutputTexel`,n.outputColorSpace),Ur(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(qr).join(`
`)),o=Zr(o),o=Jr(o,n),o=Yr(o,n),s=Zr(s),s=Jr(s,n),s=Yr(s,n),o=ti(o),s=ti(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Mr(i,i.VERTEX_SHADER,y),S=Mr(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Rr(i,x,`vertex`),n=Rr(i,S,`fragment`);st(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):jt(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new jr(i,h),T=Kr(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Nr)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Pr++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var mi=0,hi=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new gi(e),t.set(e,n)),n}},gi=class{constructor(e){this.id=mi++,this.code=e,this.usedTimes=0}};function _i(e){return e===1030||e===37490||e===36285}function vi(e,t,n,r,i,a){let o=new nt,s=new hi,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&jt(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,ee;if(C){let e=Rt[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,ee=t.id}let A=e.getRenderTarget(),te=e.state.buffers.depth.getReversed(),j=h.isInstancedMesh===!0,ne=h.isBatchedMesh===!0,M=!!i.map,N=!!i.matcap,P=!!x,re=!!i.aoMap,ie=!!i.lightMap,ae=!!i.bumpMap&&i.wireframe===!1,oe=!!i.normalMap,se=!!i.displacementMap,ce=!!i.emissiveMap,F=!!i.metalnessMap,I=!!i.roughnessMap,L=i.anisotropy>0,le=i.clearcoat>0,ue=i.dispersion>0,de=i.retroreflectivity>0,R=i.iridescence>0,fe=i.sheen>0,pe=i.transmission>0,z=L&&!!i.anisotropyMap,me=le&&!!i.clearcoatMap,he=le&&!!i.clearcoatNormalMap,ge=le&&!!i.clearcoatRoughnessMap,_e=R&&!!i.iridescenceMap,ve=R&&!!i.iridescenceThicknessMap,ye=fe&&!!i.sheenColorMap,be=fe&&!!i.sheenRoughnessMap,xe=!!i.specularMap,Se=!!i.specularColorMap,Ce=!!i.specularIntensityMap,B=pe&&!!i.transmissionMap,V=pe&&!!i.thicknessMap,we=!!i.gradientMap,Te=!!i.alphaMap,De=i.alphaTest>0,Oe=!!i.alphaHash,H=!!i.extensions,ke=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(ke=e.toneMapping);let Ae={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:ee,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:ne,batchingColor:ne&&h._colorsTexture!==null,instancing:j,instancingColor:j&&h.instanceColor!==null,instancingMorph:j&&h.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Ee.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:M,matcap:N,envMap:P,envMapMode:P&&x.mapping,envMapCubeUVHeight:S,aoMap:re,lightMap:ie,bumpMap:ae,normalMap:oe,displacementMap:se,emissiveMap:ce,normalMapObjectSpace:oe&&i.normalMapType===1,normalMapTangentSpace:oe&&i.normalMapType===0,packedNormalMap:oe&&i.normalMapType===0&&_i(i.normalMap.format),metalnessMap:F,roughnessMap:I,anisotropy:L,anisotropyMap:z,clearcoat:le,clearcoatMap:me,clearcoatNormalMap:he,clearcoatRoughnessMap:ge,dispersion:ue,retroreflection:de,iridescence:R,iridescenceMap:_e,iridescenceThicknessMap:ve,sheen:fe,sheenColorMap:ye,sheenRoughnessMap:be,specularMap:xe,specularColorMap:Se,specularIntensityMap:Ce,transmission:pe,transmissionMap:B,thicknessMap:V,gradientMap:we,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Te,alphaTest:De,alphaHash:Oe,combine:i.combine,mapUv:M&&m(i.map.channel),aoMapUv:re&&m(i.aoMap.channel),lightMapUv:ie&&m(i.lightMap.channel),bumpMapUv:ae&&m(i.bumpMap.channel),normalMapUv:oe&&m(i.normalMap.channel),displacementMapUv:se&&m(i.displacementMap.channel),emissiveMapUv:ce&&m(i.emissiveMap.channel),metalnessMapUv:F&&m(i.metalnessMap.channel),roughnessMapUv:I&&m(i.roughnessMap.channel),anisotropyMapUv:z&&m(i.anisotropyMap.channel),clearcoatMapUv:me&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:he&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:_e&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:ve&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:ye&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:be&&m(i.sheenRoughnessMap.channel),specularMapUv:xe&&m(i.specularMap.channel),specularColorMapUv:Se&&m(i.specularColorMap.channel),specularIntensityMapUv:Ce&&m(i.specularIntensityMap.channel),transmissionMapUv:B&&m(i.transmissionMap.channel),thicknessMapUv:V&&m(i.thicknessMap.channel),alphaMapUv:Te&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(oe||L),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(M||Te),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&oe===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:te,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:ke,decodeVideoTexture:M&&i.map.isVideoTexture===!0&&Ee.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ce&&i.emissiveMap.isVideoTexture===!0&&Ee.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:H&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(H&&i.extensions.multiDraw===!0||ne)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ae.vertexUv1s=c.has(1),Ae.vertexUv2s=c.has(2),Ae.vertexUv3s=c.has(3),c.clear(),Ae}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Rt[t];n=D.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new pi(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function yi(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function bi(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function xi(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Si(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||bi),r.length>1&&r.sort(t||xi),i.length>1&&i.sort(t||xi)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Ci(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Si,e.set(t,[i])):n>=r.length?(i=new Si,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function wi(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new G,color:new q};break;case`SpotLight`:n={position:new G,direction:new G,color:new q,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new G,color:new q,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new G,skyColor:new q,groundColor:new q};break;case`RectAreaLight`:n={color:new q,position:new G,halfWidth:new G,halfHeight:new G}}return e[t.id]=n,n}}}function Ti(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pt};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pt};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pt,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Ei=0;function Di(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Oi(e){let t=new wi,n=Ti(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new G);let i=new G,a=new Tt,o=new Tt;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Di);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Y.LTC_FLOAT_1,r.rectAreaLTC2=Y.LTC_FLOAT_2):(r.rectAreaLTC1=Y.LTC_HALF_1,r.rectAreaLTC2=Y.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Ei++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function ki(e){let t=new Oi(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Ai(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new ki(e),t.set(n,[a])):r>=i.length?(a=new ki(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var ji=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Mi=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Ni=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],Pi=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],Fi=new Tt,Ii=new G,Li=new G;function Ri(e,n,r){let i=new me,a=new pt,o=new pt,s=new we,l=new At,u=new ue,d={},f=r.maxTextureSize,p={0:1,1:0,2:2},m=new te({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new pt},radius:{value:4}},vertexShader:ji,fragmentShader:Mi}),g=m.clone();g.defines.HORIZONTAL_PASS=1;let _=new ze;_.setAttribute(`position`,new K(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Mt(_,m),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let b=this.type;this.render=function(n,r,l){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||n.length===0)return;this.type===2&&(jt(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.state;m.setBlending(0),m.buffers.depth.getReversed()===!0?m.buffers.color.setClear(0,0,0,0):m.buffers.color.setClear(1,1,1,1),m.buffers.depth.setTest(!0),m.setScissorTest(!1);let g=b!==this.type;g&&r.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=n.length;u<d;u++){let d=n[u],p=d.shadow;if(p===void 0){jt(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;a.copy(p.mapSize);let _=p.getFrameExtents();a.multiply(_),o.copy(p.mapSize),(a.x>f||a.y>f)&&(a.x>f&&(o.x=Math.floor(f/_.x),a.x=o.x*_.x,p.mapSize.x=o.x),a.y>f&&(o.y=Math.floor(f/_.y),a.y=o.y*_.y,p.mapSize.y=o.y));let v=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=v,p.map===null||g===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){jt(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new ke(a.x,a.y,{format:c,type:ge,minFilter:gt,magFilter:gt,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new We(a.x,a.y,Nt),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=Ke,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=h,p.map.depthTexture.magFilter=h}else d.isPointLight?(p.map=new hn(a.x),p.map.depthTexture=new le(a.x,t)):(p.map=new ke(a.x,a.y),p.map.depthTexture=new We(a.x,a.y,t)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=Ke,this.type===1?(p.map.depthTexture.compareFunction=v?518:515,p.map.depthTexture.minFilter=gt,p.map.depthTexture.magFilter=gt):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=h,p.map.depthTexture.magFilter=h);p.camera.updateProjectionMatrix()}p.map.isWebGLCubeRenderTarget!==!0&&(p.map.width!==a.x||p.map.height!==a.y)&&p.map.setSize(a.x,a.y);let y=p.map.isWebGLCubeRenderTarget?6:p.getViewportCount();d.isPointLight!==!0&&p.updateMatrices(d,l);for(let t=0;t<y;t++){let n=p.getCamera(t);if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Ii.setFromMatrixPosition(d.matrixWorld),e.position.copy(Ii),Li.copy(e.position),Li.add(Ni[t]),e.up.copy(Pi[t]),e.lookAt(Li),e.updateMatrixWorld(),n.makeTranslation(-Ii.x,-Ii.y,-Ii.z),Fi.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(Fi,e.coordinateSystem,e.reversedDepth)}if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);s.set(o.x*n.x,o.y*n.y,o.x*n.z,o.y*n.w),m.viewport(s)}i=p.getFrustum(t),C(r,l,n,d,this.type)}p.isPointLightShadow!==!0&&this.type===3&&x(p,l),p.needsUpdate=!1}b=this.type,y.needsUpdate=!1,e.setRenderTarget(u,d,p)};function x(t,r){let i=n.update(v);m.defines.VSM_SAMPLES!==t.blurSamples&&(m.defines.VSM_SAMPLES=t.blurSamples,g.defines.VSM_SAMPLES=t.blurSamples,m.needsUpdate=!0,g.needsUpdate=!0),t.mapPass===null?t.mapPass=new ke(a.x,a.y,{format:c,type:ge}):(t.mapPass.width!==t.map.width||t.mapPass.height!==t.map.height)&&t.mapPass.setSize(t.map.width,t.map.height),m.uniforms.shadow_pass.value=t.map.depthTexture,m.uniforms.resolution.value.set(t.map.width,t.map.height),m.uniforms.radius.value=t.radius,e.setRenderTarget(t.mapPass),e.clear(),e.renderBufferDirect(r,null,i,m,v,null),g.uniforms.shadow_pass.value=t.mapPass.texture,g.uniforms.resolution.value.set(t.map.width,t.map.height),g.uniforms.radius.value=t.radius,e.setRenderTarget(t.map),e.clear(),e.renderBufferDirect(r,null,i,g,v,null)}function S(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:l,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,w)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function C(t,r,a,o,s){if(t.visible===!1)return;if(t.layers.test(r.layers)&&(t.isMesh||t.isLine||t.isPoints)&&(t.castShadow||t.receiveShadow&&s===3)&&(!t.frustumCulled||t.intersectsFrustum(i))){t.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,t.matrixWorld);let i=n.update(t),c=t.material;if(Array.isArray(c)){let n=i.groups;for(let l=0,u=n.length;l<u;l++){let u=n[l],d=c[u.materialIndex];if(d&&d.visible){let n=S(t,d,o,s);t.onBeforeShadow(e,t,r,a,i,n,u),e.renderBufferDirect(a,null,i,n,t,u),t.onAfterShadow(e,t,r,a,i,n,u)}}}else if(c.visible){let n=S(t,c,o,s);t.onBeforeShadow(e,t,r,a,i,n,null),e.renderBufferDirect(a,null,i,n,t,null),t.onAfterShadow(e,t,r,a,i,n,null)}}let c=t.children;for(let e=0,t=c.length;e<t;e++)C(c[e],r,a,o,s)}function w(e){e.target.removeEventListener(`dispose`,w);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function zi(e,t){function n(){let t=!1,n=new we,r=null,i=new we(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?F(e.DEPTH_TEST):I(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=qe[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?F(e.STENCIL_TEST):I(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new q(0,0,0),T=0,E=!1,D=null,O=null,k=null,ee=null,A=null,te=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,ne=0,M=e.getParameter(e.VERSION);M.indexOf(`WebGL`)===-1?M.indexOf(`OpenGL ES`)!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(M)[1]),j=ne>=2):(ne=parseFloat(/^WebGL (\d)/.exec(M)[1]),j=ne>=1);let N=null,P={},re=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),ae=new we().fromArray(re),oe=new we().fromArray(ie);function se(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ce={};ce[e.TEXTURE_2D]=se(e.TEXTURE_2D,e.TEXTURE_2D,1),ce[e.TEXTURE_CUBE_MAP]=se(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[e.TEXTURE_2D_ARRAY]=se(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ce[e.TEXTURE_3D]=se(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),F(e.DEPTH_TEST),o.setFunc(3),z(!1),me(1),F(e.CULL_FACE),fe(0);function F(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function I(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function L(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function le(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ue(t){return h!==t&&(e.useProgram(t),h=t,!0)}let de={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};de[103]=e.MIN,de[104]=e.MAX;let R={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function fe(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(I(e.BLEND),g=!1);else if(g===!1&&(F(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:st(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:st(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:st(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:st(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(de[n],de[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(R[r],R[i],R[o],R[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function pe(t,n){t.side===2?I(e.CULL_FACE):F(e.CULL_FACE);let r=t.side===1;n&&(r=!r),z(r),t.blending===1&&t.transparent===!1?fe(0):fe(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ge(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?F(e.SAMPLE_ALPHA_TO_COVERAGE):I(e.SAMPLE_ALPHA_TO_COVERAGE)}function z(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function me(t){t===0?I(e.CULL_FACE):(F(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function he(t){t!==k&&(j&&e.lineWidth(t),k=t)}function ge(t,n,r){t?(F(e.POLYGON_OFFSET_FILL),(ee!==n||A!==r)&&(ee=n,A=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):I(e.POLYGON_OFFSET_FILL)}function _e(t){t?F(e.SCISSOR_TEST):I(e.SCISSOR_TEST)}function ve(t){t===void 0&&(t=e.TEXTURE0+te-1),N!==t&&(e.activeTexture(t),N=t)}function ye(t,n,r){r===void 0&&(r=N===null?e.TEXTURE0+te-1:N);let i=P[r];i===void 0&&(i={type:void 0,texture:void 0},P[r]=i),(i.type!==t||i.texture!==n)&&(N!==r&&(e.activeTexture(r),N=r),e.bindTexture(t,n||ce[t]),i.type=t,i.texture=n)}function be(){let t=P[N];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function xe(){try{e.compressedTexImage2D(...arguments)}catch(e){st(`WebGLState:`,e)}}function Se(){try{e.compressedTexImage3D(...arguments)}catch(e){st(`WebGLState:`,e)}}function Ce(){try{e.texSubImage2D(...arguments)}catch(e){st(`WebGLState:`,e)}}function B(){try{e.texSubImage3D(...arguments)}catch(e){st(`WebGLState:`,e)}}function V(){try{e.compressedTexSubImage2D(...arguments)}catch(e){st(`WebGLState:`,e)}}function Te(){try{e.compressedTexSubImage3D(...arguments)}catch(e){st(`WebGLState:`,e)}}function Ee(){try{e.texStorage2D(...arguments)}catch(e){st(`WebGLState:`,e)}}function De(){try{e.texStorage3D(...arguments)}catch(e){st(`WebGLState:`,e)}}function Oe(){try{e.texImage2D(...arguments)}catch(e){st(`WebGLState:`,e)}}function H(){try{e.texImage3D(...arguments)}catch(e){st(`WebGLState:`,e)}}function ke(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ae(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function je(t){ae.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ae.copy(t))}function Me(t){oe.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),oe.copy(t))}function U(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ne(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function W(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},N=null,P={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new q(0,0,0),T=0,E=!1,D=null,O=null,k=null,ee=null,A=null,ae.set(0,0,e.canvas.width,e.canvas.height),oe.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:F,disable:I,bindFramebuffer:L,drawBuffers:le,useProgram:ue,setBlending:fe,setMaterial:pe,setFlipSided:z,setCullFace:me,setLineWidth:he,setPolygonOffset:ge,setScissorTest:_e,activeTexture:ve,bindTexture:ye,unbindTexture:be,compressedTexImage2D:xe,compressedTexImage3D:Se,texImage2D:Oe,texImage3D:H,pixelStorei:Ae,getParameter:ke,updateUBOMapping:U,uniformBlockBinding:Ne,texStorage2D:Ee,texStorage3D:De,texSubImage2D:Ce,texSubImage3D:B,compressedTexSubImage2D:V,compressedTexSubImage3D:Te,scissor:je,viewport:Me,reset:W}}function Bi(e,t,r,i,a,o,s){let c=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,l=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),u=new pt,d=new WeakMap,p=new Set,m,g=new WeakMap,_=!1;try{_=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function v(e,t){return _?new OffscreenCanvas(e,t):Fe(`canvas`)}function y(e,t,n){let r=1,i=Te(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);m===void 0&&(m=v(n,a));let o=t?v(n,a):m;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),jt(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&jt(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function b(e){return e.generateMipmaps}function x(t){e.generateMipmap(t)}function S(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function C(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];jt(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||jt(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?U:Ee.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function w(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,jt(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function T(e,t){return b(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function E(e){let t=e.target;t.removeEventListener(`dispose`,E),O(t),t.isVideoTexture&&d.delete(t),t.isHTMLTexture&&p.delete(t)}function D(e){let t=e.target;t.removeEventListener(`dispose`,D),ee(t)}function O(e){let t=i.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=g.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&k(e),Object.keys(r).length===0&&g.delete(n)}i.remove(e)}function k(t){let n=i.get(t);e.deleteTexture(n.__webglTexture);let r=t.source,a=g.get(r);delete a[n.__cacheKey],s.memory.textures--}function ee(t){let n=i.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),i.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let r=t.textures;for(let t=0,n=r.length;t<n;t++){let n=i.get(r[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),s.memory.textures--),i.remove(r[t])}i.remove(t)}let A=0;function te(){A=0}function j(){return A}function ne(e){A=e}function M(){let e=A;return e>=a.maxTextures&&jt(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+a.maxTextures),A+=1,e}function N(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function P(t,n){let a=i.get(t);if(t.isVideoTexture&&V(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)jt(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)jt(`WebGLRenderer: Texture marked for update but image is incomplete`);else{R(a,t,n);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);r.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+n)}function re(t,n){let a=i.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?R(a,t,n):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),r.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+n))}function oe(t,n){let a=i.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?R(a,t,n):r.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+n)}function se(t,n){let a=i.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version?pe(a,t,n):r.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+n)}let ce={[ie]:e.REPEAT,[Ct]:e.CLAMP_TO_EDGE,[fe]:e.MIRRORED_REPEAT},F={[h]:e.NEAREST,[ae]:e.NEAREST_MIPMAP_NEAREST,[f]:e.NEAREST_MIPMAP_LINEAR,[gt]:e.LINEAR,[Ze]:e.LINEAR_MIPMAP_NEAREST,[Ae]:e.LINEAR_MIPMAP_LINEAR},I={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function L(n,r){if(r.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(r.magFilter===1006||r.magFilter===1007||r.magFilter===1005||r.magFilter===1008||r.minFilter===1006||r.minFilter===1007||r.minFilter===1005||r.minFilter===1008)&&jt(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ce[r.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ce[r.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ce[r.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,F[r.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,F[r.minFilter]),r.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,I[r.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(r.magFilter===1003||r.minFilter!==1005&&r.minFilter!==1008||r.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(r.anisotropy>1||i.get(r).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(r.anisotropy,a.getMaxAnisotropy())),i.get(r).__currentAnisotropy=r.anisotropy}}}function le(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,E));let i=n.source,a=g.get(i);a===void 0&&(a={},g.set(i,a));let o=N(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},s.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&k(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function ue(e,t,n){return Math.floor(Math.floor(e/n)/t)}function de(t,n,i,a){let o=t.updateRanges;if(o.length===0)r.texSubImage2D(e.TEXTURE_2D,0,0,0,n.width,n.height,i,a,n.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],r=o[e],i=t.start+t.count,a=ue(r.start,n.width,4),c=ue(t.start,n.width,4);r.start<=i+1&&a===c&&ue(r.start+r.count-1,n.width,4)===a?t.count=Math.max(t.count,r.start+r.count-t.start):(++s,o[s]=r)}o.length=s+1;let c=r.getParameter(e.UNPACK_ROW_LENGTH),l=r.getParameter(e.UNPACK_SKIP_PIXELS),u=r.getParameter(e.UNPACK_SKIP_ROWS);r.pixelStorei(e.UNPACK_ROW_LENGTH,n.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%n.width,d=Math.floor(c/n.width),f=l;r.pixelStorei(e.UNPACK_SKIP_PIXELS,u),r.pixelStorei(e.UNPACK_SKIP_ROWS,d),r.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,n.data)}t.clearUpdateRanges(),r.pixelStorei(e.UNPACK_ROW_LENGTH,c),r.pixelStorei(e.UNPACK_SKIP_PIXELS,l),r.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function R(t,s,c){let l=e.TEXTURE_2D;(s.isDataArrayTexture||s.isCompressedArrayTexture)&&(l=e.TEXTURE_2D_ARRAY),s.isData3DTexture&&(l=e.TEXTURE_3D);let u=le(t,s),d=s.source;r.bindTexture(l,t.__webglTexture,e.TEXTURE0+c);let f=i.get(d);if(d.version!==f.__version||u===!0){if(r.activeTexture(e.TEXTURE0+c),!(typeof ImageBitmap<`u`&&s.image instanceof ImageBitmap)){let t=Ee.getPrimaries(Ee.workingColorSpace),n=s.colorSpace===``?null:Ee.getPrimaries(s.colorSpace),i=s.colorSpace===``||t===n?e.NONE:e.BROWSER_DEFAULT_WEBGL;r.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),r.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),r.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}r.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment);let t=y(s.image,!1,a.maxTextureSize);t=we(s,t);let i=o.convert(s.format,s.colorSpace),m=o.convert(s.type),h=C(s.internalFormat,i,m,s.normalized,s.colorSpace,s.isVideoTexture);L(l,s);let g,_=s.mipmaps,v=s.isVideoTexture!==!0,S=f.__version===void 0||u===!0,E=d.dataReady,D=T(s,t);if(s.isDepthTexture)h=w(s.format===n,s.type),S&&(v?r.texStorage2D(e.TEXTURE_2D,1,h,t.width,t.height):r.texImage2D(e.TEXTURE_2D,0,h,t.width,t.height,0,i,m,null));else if(s.isDataTexture){if(_.length>0){v&&S&&r.texStorage2D(e.TEXTURE_2D,D,h,_[0].width,_[0].height);for(let t=0,n=_.length;t<n;t++)g=_[t],v?E&&r.texSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,i,m,g.data):r.texImage2D(e.TEXTURE_2D,t,h,g.width,g.height,0,i,m,g.data);s.generateMipmaps=!1}else v?(S&&r.texStorage2D(e.TEXTURE_2D,D,h,t.width,t.height),E&&de(s,t,i,m)):r.texImage2D(e.TEXTURE_2D,0,h,t.width,t.height,0,i,m,t.data)}else if(s.isCompressedTexture){if(s.isCompressedArrayTexture){v&&S&&r.texStorage3D(e.TEXTURE_2D_ARRAY,D,h,_[0].width,_[0].height,t.depth);for(let n=0,a=_.length;n<a;n++)if(g=_[n],s.format!==1023){if(i!==null){if(v){if(E){if(s.layerUpdates.size>0){let t=Qe(g.width,g.height,s.format,s.type);for(let a of s.layerUpdates){let o=g.data.subarray(a*t/g.data.BYTES_PER_ELEMENT,(a+1)*t/g.data.BYTES_PER_ELEMENT);r.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,n,0,0,a,g.width,g.height,1,i,o)}}else r.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,n,0,0,0,g.width,g.height,t.depth,i,g.data)}}else r.compressedTexImage3D(e.TEXTURE_2D_ARRAY,n,h,g.width,g.height,t.depth,0,g.data,0,0)}else jt(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else v?E&&r.texSubImage3D(e.TEXTURE_2D_ARRAY,n,0,0,0,g.width,g.height,t.depth,i,m,g.data):r.texImage3D(e.TEXTURE_2D_ARRAY,n,h,g.width,g.height,t.depth,0,i,m,g.data);s.layerUpdates.size>0&&s.clearLayerUpdates()}else{v&&S&&r.texStorage2D(e.TEXTURE_2D,D,h,_[0].width,_[0].height);for(let t=0,n=_.length;t<n;t++)g=_[t],s.format===1023?v?E&&r.texSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,i,m,g.data):r.texImage2D(e.TEXTURE_2D,t,h,g.width,g.height,0,i,m,g.data):i===null?jt(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):v?E&&r.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,i,g.data):r.compressedTexImage2D(e.TEXTURE_2D,t,h,g.width,g.height,0,g.data)}}else if(s.isDataArrayTexture){if(v){if(S&&r.texStorage3D(e.TEXTURE_2D_ARRAY,D,h,t.width,t.height,t.depth),E){if(s.layerUpdates.size>0){let n=Qe(t.width,t.height,s.format,s.type);for(let a of s.layerUpdates){let o=t.data.subarray(a*n/t.data.BYTES_PER_ELEMENT,(a+1)*n/t.data.BYTES_PER_ELEMENT);r.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,i,m,o)}s.clearLayerUpdates()}else r.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,i,m,t.data)}}else r.texImage3D(e.TEXTURE_2D_ARRAY,0,h,t.width,t.height,t.depth,0,i,m,t.data)}else if(s.isData3DTexture)v?(S&&r.texStorage3D(e.TEXTURE_3D,D,h,t.width,t.height,t.depth),E&&r.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,i,m,t.data)):r.texImage3D(e.TEXTURE_3D,0,h,t.width,t.height,t.depth,0,i,m,t.data);else if(s.isFramebufferTexture){if(S){if(v)r.texStorage2D(e.TEXTURE_2D,D,h,t.width,t.height);else{let n=t.width,a=t.height;for(let t=0;t<D;t++)r.texImage2D(e.TEXTURE_2D,t,h,n,a,0,i,m,null),n>>=1,a>>=1}}}else if(s.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),p.add(s),n.onpaint=e=>{let t=e.changedElements;for(let e of p)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(_.length>0){if(v&&S){let t=Te(_[0]);r.texStorage2D(e.TEXTURE_2D,D,h,t.width,t.height)}for(let t=0,n=_.length;t<n;t++)g=_[t],v?E&&r.texSubImage2D(e.TEXTURE_2D,t,0,0,i,m,g):r.texImage2D(e.TEXTURE_2D,t,h,i,m,g);s.generateMipmaps=!1}else if(v){if(S){let n=Te(t);r.texStorage2D(e.TEXTURE_2D,D,h,n.width,n.height)}E&&r.texSubImage2D(e.TEXTURE_2D,0,0,0,i,m,t)}else r.texImage2D(e.TEXTURE_2D,0,h,i,m,t);b(s)&&x(l),f.__version=d.version,s.onUpdate&&s.onUpdate(s)}t.__version=s.version}function pe(t,n,s){if(n.image.length!==6)return;let c=le(t,n),l=n.source;r.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=i.get(l);if(l.version!==u.__version||c===!0){r.activeTexture(e.TEXTURE0+s);let t=Ee.getPrimaries(Ee.workingColorSpace),i=n.colorSpace===``?null:Ee.getPrimaries(n.colorSpace),d=n.colorSpace===``||t===i?e.NONE:e.BROWSER_DEFAULT_WEBGL;r.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),r.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),r.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment),r.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=n.isCompressedTexture||n.image[0].isCompressedTexture,p=n.image[0]&&n.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=y(n.image[e],!0,a.maxCubemapSize):m[e]=p?n.image[e].image:n.image[e],m[e]=we(n,m[e]);let h=m[0],g=o.convert(n.format,n.colorSpace),_=o.convert(n.type),v=C(n.internalFormat,g,_,n.normalized,n.colorSpace),S=n.isVideoTexture!==!0,w=u.__version===void 0||c===!0,E=l.dataReady,D=T(n,h);L(e.TEXTURE_CUBE_MAP,n);let O;if(f){S&&w&&r.texStorage2D(e.TEXTURE_CUBE_MAP,D,v,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let i=0;i<O.length;i++){let a=O[i];n.format===1023?S?E&&r.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,i,0,0,a.width,a.height,g,_,a.data):r.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,i,v,a.width,a.height,0,g,_,a.data):g===null?jt(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):S?E&&r.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,i,0,0,a.width,a.height,g,a.data):r.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,i,v,a.width,a.height,0,a.data)}}}else{if(O=n.mipmaps,S&&w){O.length>0&&D++;let t=Te(m[0]);r.texStorage2D(e.TEXTURE_CUBE_MAP,D,v,t.width,t.height)}for(let t=0;t<6;t++)if(p){S?E&&r.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):r.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,m[t].width,m[t].height,0,g,_,m[t].data);for(let n=0;n<O.length;n++){let i=O[n].image[t].image;S?E&&r.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,i.width,i.height,g,_,i.data):r.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,v,i.width,i.height,0,g,_,i.data)}}else{S?E&&r.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):r.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,m[t]);for(let n=0;n<O.length;n++){let i=O[n];S?E&&r.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,g,_,i.image[t]):r.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,v,g,_,i.image[t])}}}b(n)&&x(e.TEXTURE_CUBE_MAP),u.__version=l.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}function z(t,n,a,s,l,u){let d=o.convert(a.format,a.colorSpace),f=o.convert(a.type),p=C(a.internalFormat,d,f,a.normalized,a.colorSpace),m=i.get(n),h=i.get(a);if(h.__renderTarget=n,!m.__hasExternalTextures){let t=Math.max(1,n.width>>u),i=Math.max(1,n.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?r.texImage3D(l,u,p,t,i,n.depth,0,d,f,null):r.texImage2D(l,u,p,t,i,0,d,f,null)}r.bindFramebuffer(e.FRAMEBUFFER,t),B(n)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,s,l,h.__webglTexture,0,Ce(n)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,s,l,h.__webglTexture,u),r.bindFramebuffer(e.FRAMEBUFFER,null)}function me(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=w(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;B(n)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ce(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ce(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],s=o.convert(a.format,a.colorSpace),l=o.convert(a.type),u=C(a.internalFormat,s,l,a.normalized,a.colorSpace);B(n)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ce(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ce(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function he(t,n,a){let s=n.isWebGLCubeRenderTarget===!0;if(r.bindFramebuffer(e.FRAMEBUFFER,t),!(n.depthTexture&&n.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=i.get(n.depthTexture);if(l.__renderTarget=n,l.__webglTexture&&n.depthTexture.image.width===n.width&&n.depthTexture.image.height===n.height||(n.depthTexture.image.width=n.width,n.depthTexture.image.height=n.height,n.depthTexture.needsUpdate=!0),s){if(l.__webglInit===void 0&&(l.__webglInit=!0,n.depthTexture.addEventListener(`dispose`,E)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),r.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),L(e.TEXTURE_CUBE_MAP,n.depthTexture);let t=o.convert(n.depthTexture.format),i=o.convert(n.depthTexture.type),a;n.depthTexture.format===1026?a=e.DEPTH_COMPONENT24:n.depthTexture.format===1027&&(a=e.DEPTH24_STENCIL8);for(let r=0;r<6;r++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,a,n.width,n.height,0,t,i,null)}}else P(n.depthTexture,0);let u=l.__webglTexture,d=Ce(n),f=s?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=n.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(n.depthTexture.format===1026)B(n)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(n.depthTexture.format===1027)B(n)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function ge(t){let n=i.get(t),a=t.isWebGLCubeRenderTarget===!0;if(n.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(n.__depthDisposeCallback&&n.__depthDisposeCallback(),e){let t=()=>{delete n.__boundDepthTexture,delete n.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),n.__depthDisposeCallback=t}n.__boundDepthTexture=e}if(t.depthTexture&&!n.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)he(n.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?he(n.__webglFramebuffer[0],t,0):he(n.__webglFramebuffer,t,0)}}else if(a){n.__webglDepthbuffer=[];for(let i=0;i<6;i++)if(r.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[i]),n.__webglDepthbuffer[i]===void 0)n.__webglDepthbuffer[i]=e.createRenderbuffer(),me(n.__webglDepthbuffer[i],t,!1);else{let r=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=n.__webglDepthbuffer[i];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,r,e.RENDERBUFFER,a)}}else{let i=t.texture.mipmaps;if(i&&i.length>0?r.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[0]):r.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer),n.__webglDepthbuffer===void 0)n.__webglDepthbuffer=e.createRenderbuffer(),me(n.__webglDepthbuffer,t,!1);else{let r=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,i=n.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,i),e.framebufferRenderbuffer(e.FRAMEBUFFER,r,e.RENDERBUFFER,i)}}r.bindFramebuffer(e.FRAMEBUFFER,null)}function _e(t,n,r){let a=i.get(t);n!==void 0&&z(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),r!==void 0&&ge(t)}function ve(t){let n=t.texture,a=i.get(t),c=i.get(n);t.addEventListener(`dispose`,D);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=n.version,s.memory.textures++),u){a.__webglFramebuffer=[];for(let t=0;t<6;t++)if(n.mipmaps&&n.mipmaps.length>0){a.__webglFramebuffer[t]=[];for(let r=0;r<n.mipmaps.length;r++)a.__webglFramebuffer[t][r]=e.createFramebuffer()}else a.__webglFramebuffer[t]=e.createFramebuffer()}else{if(n.mipmaps&&n.mipmaps.length>0){a.__webglFramebuffer=[];for(let t=0;t<n.mipmaps.length;t++)a.__webglFramebuffer[t]=e.createFramebuffer()}else a.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=i.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),s.memory.textures++)}if(t.samples>0&&B(t)===!1){a.__webglMultisampledFramebuffer=e.createFramebuffer(),a.__webglColorRenderbuffer=[],r.bindFramebuffer(e.FRAMEBUFFER,a.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];a.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,a.__webglColorRenderbuffer[n]);let i=o.convert(r.format,r.colorSpace),s=o.convert(r.type),c=C(r.internalFormat,i,s,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Ce(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,a.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(a.__webglDepthRenderbuffer=e.createRenderbuffer(),me(a.__webglDepthRenderbuffer,t,!0)),r.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){r.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),L(e.TEXTURE_CUBE_MAP,n);for(let r=0;r<6;r++)if(n.mipmaps&&n.mipmaps.length>0)for(let i=0;i<n.mipmaps.length;i++)z(a.__webglFramebuffer[r][i],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+r,i);else z(a.__webglFramebuffer[r],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+r,0);b(n)&&x(e.TEXTURE_CUBE_MAP),r.unbindTexture()}else if(d){for(let n=0,o=l.length;n<o;n++){let o=l[n],s=i.get(o),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),r.bindTexture(c,s.__webglTexture),L(c,o),z(a.__webglFramebuffer,t,o,e.COLOR_ATTACHMENT0+n,c,0),b(o)&&x(c)}r.unbindTexture()}else{let i=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(i=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),r.bindTexture(i,c.__webglTexture),L(i,n),n.mipmaps&&n.mipmaps.length>0)for(let r=0;r<n.mipmaps.length;r++)z(a.__webglFramebuffer[r],t,n,e.COLOR_ATTACHMENT0,i,r);else z(a.__webglFramebuffer,t,n,e.COLOR_ATTACHMENT0,i,0);b(n)&&x(i),r.unbindTexture()}t.depthBuffer&&ge(t)}function ye(e){let t=e.textures;for(let n=0,a=t.length;n<a;n++){let a=t[n];if(b(a)){let t=S(e),n=i.get(a).__webglTexture;r.bindTexture(t,n),x(t),r.unbindTexture()}}}let be=[],xe=[];function Se(t){if(t.samples>0){if(B(t)===!1){let n=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,c=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=i.get(t),d=n.length>1;if(d)for(let t=0;t<n.length;t++)r.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),r.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);r.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?r.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):r.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let r=0;r<n.length;r++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[r]);let t=i.get(n[r]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),l===!0&&(be.length=0,xe.length=0,be.push(e.COLOR_ATTACHMENT0+r),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(be.push(c),xe.push(c),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,xe)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,be))}if(r.bindFramebuffer(e.READ_FRAMEBUFFER,null),r.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<n.length;t++){r.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=i.get(n[t]).__webglTexture;r.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}r.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&l){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ce(e){return Math.min(a.maxSamples,e.samples)}function B(e){let n=i.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function V(e){let t=s.render.frame;d.get(e)!==t&&(d.set(e,t),e.update())}function we(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Ee.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&jt(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):st(`WebGLTextures: Unsupported texture color space:`,n)),t}function Te(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(u.width=e.naturalWidth||e.width,u.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(u.width=e.displayWidth,u.height=e.displayHeight):(u.width=e.width,u.height=e.height),u}this.allocateTextureUnit=M,this.resetTextureUnits=te,this.getTextureUnits=j,this.setTextureUnits=ne,this.setTexture2D=P,this.setTexture2DArray=re,this.setTexture3D=oe,this.setTextureCube=se,this.rebindTextures=_e,this.setupRenderTarget=ve,this.updateRenderTargetMipmap=ye,this.updateMultisampleRenderTarget=Se,this.setupDepthRenderbuffer=ge,this.setupFrameBufferTexture=z,this.useMultisampledRTT=B,this.isReversedDepthBuffer=function(){return r.buffers.depth.getReversed()}}function Vi(e,t){function n(n,r=``){let i,a=Ee.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Hi=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ui=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Wi=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new C(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new te({vertexShader:Hi,fragmentShader:Ui,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Mt(new ce(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Gi=class extends g{constructor(e,r){super();let i=this,a=null,o=1,s=null,c=`local-floor`,l=1,u=null,d=null,f=null,p=null,m=null,h=null,g=typeof XRWebGLBinding<`u`,_=new Wi,v={},y=r.getContextAttributes(),b=null,x=null,w=[],T=[],E=new pt,D=null,O=null,k=new M;k.viewport=new we;let A=new M;A.viewport=new we;let te=[k,A],j=new bt,ne=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=w[e];return t===void 0&&(t=new Xe,w[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=w[e];return t===void 0&&(t=new Xe,w[e]=t),t.getGripSpace()},this.getHand=function(e){let t=w[e];return t===void 0&&(t=new Xe,w[e]=t),t.getHandSpace()};function P(e){let t=T.indexOf(e.inputSource);if(t===-1)return;let n=w[t];n!==void 0&&(n.update(e.inputSource,e.frame,u||s),n.dispatchEvent({type:e.type,data:e.inputSource}))}function re(){a.removeEventListener(`select`,P),a.removeEventListener(`selectstart`,P),a.removeEventListener(`selectend`,P),a.removeEventListener(`squeeze`,P),a.removeEventListener(`squeezestart`,P),a.removeEventListener(`squeezeend`,P),a.removeEventListener(`end`,re),a.removeEventListener(`inputsourceschange`,ie);for(let e=0;e<w.length;e++){let t=T[e];t!==null&&(T[e]=null,w[e].disconnect(t))}ne=null,N=null,_.reset();for(let e in v)delete v[e];if(e.setRenderTarget(b),m=null,p=null,f=null,a=null,x=null,le.stop(),i.isPresenting=!1,e.setPixelRatio(D),e.setSize(E.width,E.height,!1),O!==null){let e=O.camera;e.fov=O.fov,e.zoom=O.zoom,e.updateProjectionMatrix(),O=null}i.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){o=e,i.isPresenting===!0&&jt(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){c=e,i.isPresenting===!0&&jt(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return u||s},this.setReferenceSpace=function(e){u=e},this.getBaseLayer=function(){return p===null?m:p},this.getBinding=function(){return f===null&&g&&(f=new XRWebGLBinding(a,r)),f},this.getFrame=function(){return h},this.getSession=function(){return a},this.setSession=async function(d){if(a=d,a!==null){if(b=e.getRenderTarget(),a.addEventListener(`select`,P),a.addEventListener(`selectstart`,P),a.addEventListener(`selectend`,P),a.addEventListener(`squeeze`,P),a.addEventListener(`squeezestart`,P),a.addEventListener(`squeezeend`,P),a.addEventListener(`end`,re),a.addEventListener(`inputsourceschange`,ie),y.xrCompatible!==!0&&await r.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(E),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let i=null,s=null,c=null;y.depth&&(c=y.stencil?r.DEPTH24_STENCIL8:r.DEPTH_COMPONENT24,i=y.stencil?n:Ke,s=y.stencil?xe:t);let l={colorFormat:r.RGBA8,depthFormat:c,scaleFactor:o};f=this.getBinding(),p=f.createProjectionLayer(l),a.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),x=new ke(p.textureWidth,p.textureHeight,{format:ee,type:ye,depthTexture:new We(p.textureWidth,p.textureHeight,s,void 0,void 0,void 0,void 0,void 0,void 0,i),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}else{let t={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:o};m=new XRWebGLLayer(a,r,t),a.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),x=new ke(m.framebufferWidth,m.framebufferHeight,{format:ee,type:ye,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),u=null,s=await a.requestReferenceSpace(c),le.setContext(a),le.start(),i.isPresenting=!0,i.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ie(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=T.indexOf(n);r>=0&&(T[r]=null,w[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=T.indexOf(n);if(r===-1){for(let e=0;e<w.length;e++)if(e>=T.length){T.push(n),r=e;break}else if(T[e]===null){T[e]=n,r=e;break}if(r===-1)break}let i=w[r];i&&i.connect(n)}}let ae=new G,oe=new G;function se(e,t,n){ae.setFromMatrixPosition(t.matrixWorld),oe.setFromMatrixPosition(n.matrixWorld);let r=ae.distanceTo(oe),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ce(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(a===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),j.near=A.near=k.near=t,j.far=A.far=k.far=n,(ne!==j.near||N!==j.far)&&(a.updateRenderState({depthNear:j.near,depthFar:j.far}),ne=j.near,N=j.far),j.layers.mask=e.layers.mask|6,k.layers.mask=j.layers.mask&-5,A.layers.mask=j.layers.mask&-3;let r=e.parent,i=j.cameras;ce(j,r);for(let e=0;e<i.length;e++)ce(i[e],r);i.length===2?se(j,k,A):j.projectionMatrix.copy(k.projectionMatrix),O===null&&e.isPerspectiveCamera&&(O={camera:e,fov:e.fov,zoom:e.zoom}),F(e,j,r)};function F(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=S*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(p!==null||m!==null)return l},this.setFoveation=function(e){l=e,p!==null&&(p.fixedFoveation=e),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(j)},this.getCameraTexture=function(e){return v[e]};let I=null;function L(t,n){if(d=n.getViewerPose(u||s),h=n,d!==null){let t=d.views;m!==null&&(e.setRenderTargetFramebuffer(x,m.framebuffer),e.setRenderTarget(x));let n=!1;t.length!==j.cameras.length&&(j.cameras.length=0,n=!0);for(let r=0;r<t.length;r++){let i=t[r],a=null;if(m!==null)a=m.getViewport(i);else{let t=f.getViewSubImage(p,i);a=t.viewport,r===0&&(e.setRenderTargetTextures(x,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(x))}let o=te[r];o===void 0&&(o=new M,o.layers.enable(r),o.viewport=new we,te[r]=o),o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(i.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),r===0&&(j.matrix.copy(o.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),n===!0&&j.cameras.push(o)}let r=a.enabledFeatures;if(r&&r.includes(`depth-sensing`)&&a.depthUsage==`gpu-optimized`&&g){f=i.getBinding();let e=f.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,a.renderState)}if(r&&r.includes(`camera-access`)&&g){e.state.unbindTexture(),f=i.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new C,v[n]=e);let t=f.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<w.length;e++){let t=T[e],r=w[e];t!==null&&r!==void 0&&r.update(t,n,u||s)}I&&I(t,n),n.detectedPlanes&&i.dispatchEvent({type:`planesdetected`,data:n}),h=null}let le=new It;le.setAnimationLoop(L),this.setAnimationLoop=function(e){I=e},this.dispose=function(){}}},Ki=new Tt,qi=new B;qi.set(-1,0,0,0,1,0,0,0,1);function Ji(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Be(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Ki.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(qi),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Yi(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return st(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?jt(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):jt(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Xi=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Zi=null;function Qi(){return Zi===null&&(Zi=new u(Xi,16,16,c,ge),Zi.name=`DFG_LUT`,Zi.minFilter=gt,Zi.magFilter=gt,Zi.wrapS=Ct,Zi.wrapT=Ct,Zi.generateMipmaps=!1,Zi.needsUpdate=!0),Zi}var $i=class{constructor(e={}){let{canvas:n=Me(),context:r=null,depth:i=!0,stencil:a=!1,alpha:o=!1,antialias:s=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u=`default`,failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:p=!1,outputBufferType:m=ye}=e;this.isWebGLRenderer=!0;let h;if(r!==null){if(typeof WebGLRenderingContext<`u`&&r instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);h=r.getContextAttributes().alpha}else h=o;let g=m,_=new Set([dt,Dt,d]),v=new Set([ye,t,tt,xe,Ne,vt]),y=new Uint32Array(4),b=new Int32Array(4),x=new G,S=null,C=null,w=[],T=[],E=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let D=this,O=!1,k=null,ee=null,A=null,te=null;this._outputColorSpace=se;let j=0,ne=0,M=null,N=-1,P=null,re=new we,ie=new we,ae=null,oe=new q(0),ce=0,F=n.width,I=n.height,L=1,le=null,ue=null,de=new we(0,0,F,I),R=new we(0,0,F,I),fe=!1,pe=new me,z=!1,he=!1,_e=new Tt,ve=new G,be=new we,Se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ce=!1;function B(){return M===null?L:1}let V=r;function Te(e,t){return n.getContext(e,t)}let De,Oe,H,je,U,W,Pe,Fe,Ie,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze;try{let e={alpha:!0,depth:i,stencil:a,antialias:s,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if(`setAttribute`in n&&n.setAttribute(`data-engine`,`three.js r186`),n.addEventListener(`webglcontextlost`,$e,!1),n.addEventListener(`webglcontextrestored`,et,!1),n.addEventListener(`webglcontextcreationerror`,nt,!1),V===null){let t=`webgl2`;if(V=Te(t,e),V===null)throw Te(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}K()}catch(e){throw n.removeEventListener(`webglcontextlost`,$e,!1),n.removeEventListener(`webglcontextrestored`,et,!1),n.removeEventListener(`webglcontextcreationerror`,nt,!1),st(`WebGLRenderer: `+e.message),e}function K(){De=new _n(V),De.init(),Ye=new Vi(V,De),Oe=new Gt(V,De,e,Ye),H=new zi(V,De),Oe.reversedDepthBuffer&&p&&H.buffers.depth.setReversed(!0),ee=V.createFramebuffer(),A=V.createFramebuffer(),te=V.createFramebuffer(),je=new bn(V),U=new yi,W=new Bi(V,De,H,U,Oe,Ye,je),Pe=new gn(D),Fe=new Lt(V),Xe=new Ut(V,Fe),Ie=new vn(V,Fe,je,Xe),Re=new Sn(V,Ie,Fe,Xe,je),Ke=new xn(V,Oe,W),Ue=new Kt(U),ze=new vi(D,Pe,De,Oe,Xe,Ue),Be=new Ji(D,U),Ve=new Ci,He=new Ai(De),Ge=new Ht(D,Pe,H,Re,h,c),We=new Ri(D,Re,Oe),Ze=new Yi(V,je,Oe,H),qe=new Wt(V,De,je),Je=new yn(V,De,je),je.programs=ze.programs,D.capabilities=Oe,D.extensions=De,D.properties=U,D.renderLists=Ve,D.shadowMap=We,D.state=H,D.info=je}g!==1009&&(E=new wn(g,n.width,n.height,s,i,a));let Qe=new Gi(D,V);this.xr=Qe,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){let e=De.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=De.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return L},this.setPixelRatio=function(e){e!==void 0&&(L=e,this.setSize(F,I,!1))},this.getSize=function(e){return e.set(F,I)},this.setSize=function(e,t,r=!0){Qe.isPresenting?jt(`WebGLRenderer: Can't change size while VR device is presenting.`):(F=e,I=t,n.width=Math.floor(e*L),n.height=Math.floor(t*L),r===!0&&(n.style.width=e+`px`,n.style.height=t+`px`),E!==null&&E.setSize(n.width,n.height),this.setViewport(0,0,e,t))},this.getDrawingBufferSize=function(e){return e.set(F*L,I*L).floor()},this.setDrawingBufferSize=function(e,t,r){F=e,I=t,L=r,n.width=Math.floor(e*r),n.height=Math.floor(t*r),this.setViewport(0,0,e,t)},this.setEffects=function(e){if(g===1009)st(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){jt(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}E.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(re)},this.getViewport=function(e){return e.copy(de)},this.setViewport=function(e,t,n,r){e.isVector4?de.set(e.x,e.y,e.z,e.w):de.set(e,t,n,r),H.viewport(re.copy(de).multiplyScalar(L).round())},this.getScissor=function(e){return e.copy(R)},this.setScissor=function(e,t,n,r){e.isVector4?R.set(e.x,e.y,e.z,e.w):R.set(e,t,n,r),H.scissor(ie.copy(R).multiplyScalar(L).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(e){H.setScissorTest(fe=e)},this.setOpaqueSort=function(e){le=e},this.setTransparentSort=function(e){ue=e},this.getClearColor=function(e){return e.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor(...arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(M!==null){let t=M.texture.format;e=_.has(t)}if(e){let e=M.texture.type,t=v.has(e),n=Ge.getClearColor(),r=Ge.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(y[0]=i,y[1]=a,y[2]=o,y[3]=r,V.clearBufferuiv(V.COLOR,0,y)):(b[0]=i,b[1]=a,b[2]=o,b[3]=r,V.clearBufferiv(V.COLOR,0,b))}else r|=V.COLOR_BUFFER_BIT}t&&(r|=V.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&V.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),k=e},this.dispose=function(){n.removeEventListener(`webglcontextlost`,$e,!1),n.removeEventListener(`webglcontextrestored`,et,!1),n.removeEventListener(`webglcontextcreationerror`,nt,!1),Ge.dispose(),Ve.dispose(),He.dispose(),U.dispose(),Pe.dispose(),Re.dispose(),Xe.dispose(),Ze.dispose(),ze.dispose(),Qe.dispose(),Qe.removeEventListener(`sessionstart`,ut),Qe.removeEventListener(`sessionend`,ft),pt.stop()};function $e(e){e.preventDefault(),Le(`WebGLRenderer: Context Lost.`),O=!0}function et(){Le(`WebGLRenderer: Context Restored.`),O=!1;let e=je.autoReset,t=We.enabled,n=We.autoUpdate,r=We.needsUpdate,i=We.type;K(),je.autoReset=e,We.enabled=t,We.autoUpdate=n,We.needsUpdate=r,We.type=i}function nt(e){st(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function rt(e){let t=e.target;t.removeEventListener(`dispose`,rt),it(t)}function it(e){at(e),U.remove(e)}function at(e){let t=U.get(e).programs;t!==void 0&&(t.forEach(function(e){ze.releaseProgram(e)}),e.isShaderMaterial&&ze.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Se);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Ot(e,t,n,r,i);H.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ie.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Xe.setup(i,r,s,n,c);let h,g=qe;if(c!==null&&(h=Fe.get(c),g=Je,g.setIndex(h)),i.isMesh)r.wireframe===!0?(H.setLineWidth(r.wireframeLinewidth*B()),g.setMode(V.LINES)):g.setMode(V.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),H.setLineWidth(e*B()),i.isLineSegments?g.setMode(V.LINES):i.isLineLoop?g.setMode(V.LINE_LOOP):g.setMode(V.LINE_STRIP)}else i.isPoints?g.setMode(V.POINTS):i.isSprite&&g.setMode(V.TRIANGLES);if(i.isBatchedMesh){if(De.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Fe.get(c).bytesPerElement:1,o=U.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(V,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function ot(e,t,n,r){k!==null&&e.isNodeMaterial&&k.setObject(r,e),z===!0&&Ue.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,xt(e,t,r),e.side=0,e.needsUpdate=!0,xt(e,t,r),e.side=2):xt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),k!==null&&k.renderStart(e,t,n),C=He.get(n),C.init(t),T.push(C),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(C.pushLight(e),e.castShadow&&C.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(C.pushLight(e),e.castShadow&&C.pushShadow(e))}),C.setupLights(),k!==null&&k.updateLights(C.state.lightsArray),he=this.localClippingEnabled,z=Ue.init(this.clippingPlanes,he),z===!0&&Ue.setGlobalState(this.clippingPlanes,t),k!==null&&We.render(C.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];ot(o,n,t,e),r.add(o)}else ot(i,n,t,e),r.add(i)}}),C=T.pop(),k!==null&&k.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=U.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}De.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ct=null;function lt(e){ct&&ct(e)}function ut(){pt.stop()}function ft(){pt.start()}let pt=new It;pt.setAnimationLoop(lt),typeof self<`u`&&pt.setContext(self),this.setAnimationLoop=function(e){ct=e,Qe.setAnimationLoop(e),e===null?pt.stop():pt.start()},Qe.addEventListener(`sessionstart`,ut),Qe.addEventListener(`sessionend`,ft),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){st(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(O===!0)return;k!==null&&k.renderStart(e,t);let n=Qe.enabled===!0&&Qe.isPresenting===!0,r=E!==null&&(M===null||n)&&E.begin(D,M);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Qe.enabled===!0&&Qe.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Qe.cameraAutoUpdate===!0&&Qe.updateCamera(t),t=Qe.getCamera()),e.isScene===!0&&e.onBeforeRender(D,e,t,M),C=He.get(e,T.length),C.init(t),C.state.textureUnits=W.getTextureUnits(),T.push(C),_e.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),pe.setFromProjectionMatrix(_e,ht,t.reversedDepth),he=this.localClippingEnabled,z=Ue.init(this.clippingPlanes,he),S=Ve.get(e,w.length),S.init(),w.push(S),Qe.enabled===!0&&Qe.isPresenting===!0){let e=D.xr.getDepthSensingMesh();e!==null&&mt(e,t,-1/0,D.sortObjects)}mt(e,t,0,D.sortObjects),S.finish(),k!==null&&k.updateLights(C.state.lightsArray),D.sortObjects===!0&&S.sort(le,ue),Ce=Qe.enabled===!1||Qe.isPresenting===!1||Qe.hasDepthSensing()===!1,Ce&&Ge.addToRenderList(S,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),z===!0&&Ue.beginShadows();let i=C.state.shadowsArray;if(We.render(i,e,t),z===!0&&Ue.endShadows(),(r&&E.hasRenderPass())===!1){let n=S.opaque,r=S.transmissive;if(C.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];_t(n,r,e,a)}Ce&&Ge.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];gt(S,e,n,n.viewport)}}else r.length>0&&_t(n,r,e,t),Ce&&Ge.render(e),gt(S,e,t)}M!==null&&ne===0&&(W.updateMultisampleRenderTarget(M),W.updateRenderTargetMipmap(M)),r&&E.end(D),e.isScene===!0&&e.onAfterRender(D,e,t),Xe.resetDefaultState(),N=-1,P=null,T.pop(),T.length>0?(C=T[T.length-1],W.setTextureUnits(C.state.textureUnits),z===!0&&Ue.setGlobalState(D.clippingPlanes,C.state.camera)):C=null,w.pop(),S=w.length>0?w[w.length-1]:null,k!==null&&k.renderEnd()};function mt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)C.pushLightProbeGrid(e);else if(e.isLight)C.pushLight(e),e.castShadow&&C.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(pe)){r&&be.setFromMatrixPosition(e.matrixWorld).applyMatrix4(_e);let i=Re.update(e),a=e.material;a.visible&&S.push(e,i,a,n,be.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(pe))){let i=Re.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),be.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),be.copy(e.boundingSphere.center)),be.applyMatrix4(e.matrixWorld).applyMatrix4(_e)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&S.push(e,i,c,n,be.z,s,t)}}else a.visible&&S.push(e,i,a,n,be.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)mt(i[e],t,n,r)}function gt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;C.setupLightsView(n),z===!0&&Ue.setGlobalState(D.clippingPlanes,n),r&&H.viewport(re.copy(r)),i.length>0&&yt(i,t,n),a.length>0&&yt(a,t,n),o.length>0&&yt(o,t,n),H.buffers.depth.setTest(!0),H.buffers.depth.setMask(!0),H.buffers.color.setMask(!0),H.setPolygonOffset(!1)}function _t(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[r.id]===void 0){let e=De.has(`EXT_color_buffer_half_float`)||De.has(`EXT_color_buffer_float`);C.state.transmissionRenderTarget[r.id]=new ke(1,1,{generateMipmaps:!0,type:e?ge:ye,minFilter:Ae,samples:Math.max(4,Oe.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ee.workingColorSpace})}let i=C.state.transmissionRenderTarget[r.id],o=r.viewport||re;i.setSize(o.z*D.transmissionResolutionScale,o.w*D.transmissionResolutionScale);let s=D.getRenderTarget(),c=D.getActiveCubeFace(),l=D.getActiveMipmapLevel();D.setRenderTarget(i),D.getClearColor(oe),ce=D.getClearAlpha(),ce<1&&D.setClearColor(16777215,.5),D.clear(),Ce&&Ge.render(n);let u=D.toneMapping;D.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),C.setupLightsView(r),z===!0&&Ue.setGlobalState(D.clippingPlanes,r),yt(e,n,r),W.updateMultisampleRenderTarget(i),W.updateRenderTargetMipmap(i),De.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,bt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(W.updateMultisampleRenderTarget(i),W.updateRenderTargetMipmap(i))}D.setRenderTarget(s,c,l),D.setClearColor(oe,ce),d!==void 0&&(r.viewport=d),D.toneMapping=u}function yt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&bt(o,t,n,s,l,c)}}function bt(e,t,n,r,i,a){k!==null&&i.isNodeMaterial&&k.setObject(e,i),e.onBeforeRender(D,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(D,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,D.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,D.renderBufferDirect(n,t,r,i,e,a),i.side=2):D.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(D,t,n,r,i,a)}function xt(e,t,n){t.isScene!==!0&&(t=Se);let r=U.get(e),i=C.state.lights,a=C.state.shadowsArray,o=i.state.version,s=ze.getParameters(e,i.state,a,t,n,C.state.lightProbeGridArray),c=ze.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Pe.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,rt),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Ct(e,s),d}else s.uniforms=ze.getUniforms(e),k!==null&&e.isNodeMaterial&&k.build(e,n,s),e.onBeforeCompile(s,D),d=ze.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ue.uniform),Ct(e,s),r.needsLights=At(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=C.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function St(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=jr.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Ct(e,t){let n=U.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Et(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];x.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(x))return n}return null}function Ot(e,t,n,r,i){t.isScene!==!0&&(t=Se),W.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=M===null?D.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Ee.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Pe.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(h=D.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=U.get(r),y=C.state.lights;if(z===!0&&(he===!0||e!==P)){let t=e===P&&r.id===N;Ue.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ue.numPlanes||v.numIntersection!==Ue.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=C.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=xt(r,t,i),k&&r.isNodeMaterial&&k.onUpdateProgram(r,x,v));let S=!1,w=!1,T=!1,E=x.getUniforms(),O=v.uniforms;if(H.useProgram(x.program)&&(S=!0,w=!0,T=!0),r.id!==N&&(N=r.id,w=!0),v.needsLights){let e=Et(C.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(S||P!==e){H.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),E.setValue(V,`projectionMatrix`,e.projectionMatrix),E.setValue(V,`viewMatrix`,e.matrixWorldInverse);let t=E.map.cameraPosition;t!==void 0&&t.setValue(V,ve.setFromMatrixPosition(e.matrixWorld)),Oe.logarithmicDepthBuffer&&E.setValue(V,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&E.setValue(V,`isOrthographic`,e.isOrthographicCamera===!0),P!==e&&(P=e,w=!0,T=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&E.setValue(V,`sunShadowMap`,y.state.sunShadowMap,W),y.state.directionalShadowMap.length>0&&E.setValue(V,`directionalShadowMap`,y.state.directionalShadowMap,W),y.state.spotShadowMap.length>0&&E.setValue(V,`spotShadowMap`,y.state.spotShadowMap,W),y.state.pointShadowMap.length>0&&E.setValue(V,`pointShadowMap`,y.state.pointShadowMap,W)),i.isSkinnedMesh){E.setOptional(V,i,`bindMatrix`),E.setOptional(V,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),E.setValue(V,`boneTexture`,e.boneTexture,W))}i.isBatchedMesh&&(E.setOptional(V,i,`batchingTexture`),E.setValue(V,`batchingTexture`,i._matricesTexture,W),E.setOptional(V,i,`batchingIdTexture`),E.setValue(V,`batchingIdTexture`,i._indirectTexture,W),E.setOptional(V,i,`batchingColorTexture`),i._colorsTexture!==null&&E.setValue(V,`batchingColorTexture`,i._colorsTexture,W));let ee=n.morphAttributes;if((ee.position!==void 0||ee.normal!==void 0||ee.color!==void 0)&&Ke.update(i,n,x),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,E.setValue(V,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(O.envMapIntensity.value=t.environmentIntensity),O.dfgLUT!==void 0&&(O.dfgLUT.value=Qi()),w){if(E.setValue(V,`toneMappingExposure`,D.toneMappingExposure),v.needsLights&&kt(O,T),a&&r.fog===!0&&Be.refreshFogUniforms(O,a),Be.refreshMaterialUniforms(O,r,L,I,C.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;O.probesSH.value=e.texture,O.probesMin.value.copy(e.boundingBox.min),O.probesMax.value.copy(e.boundingBox.max),O.probesResolution.value.copy(e.resolution)}jr.upload(V,St(v),O,W)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(jr.upload(V,St(v),O,W),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&E.setValue(V,`center`,i.center),E.setValue(V,`modelViewMatrix`,i.modelViewMatrix),E.setValue(V,`normalMatrix`,i.normalMatrix),E.setValue(V,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Ze.update(n,x),Ze.bind(n,x)}}return x}function kt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function At(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return ne},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(e,t,n){let r=U.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),U.get(e.texture).__webglTexture=t,U.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=U.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){M=e,j=t,ne=n;let r=null,i=!1,a=!1;if(e){let o=U.get(e);if(o.__useDefaultFramebuffer!==void 0){H.bindFramebuffer(V.FRAMEBUFFER,o.__webglFramebuffer),re.copy(e.viewport),ie.copy(e.scissor),ae=e.scissorTest,H.viewport(re),H.scissor(ie),H.setScissorTest(ae),N=-1;return}if(o.__webglFramebuffer===void 0)W.setupRenderTarget(e);else if(o.__hasExternalTextures)W.rebindTextures(e,U.get(e.texture).__webglTexture,U.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&U.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);W.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=U.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&W.useMultisampledRTT(e)===!1?U.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,re.copy(e.viewport),ie.copy(e.scissor),ae=e.scissorTest}else re.copy(de).multiplyScalar(L).floor(),ie.copy(R).multiplyScalar(L).floor(),ae=fe;if(n!==0&&(r=ee),H.bindFramebuffer(V.FRAMEBUFFER,r)&&H.drawBuffers(e,r),H.viewport(re),H.scissor(ie),H.setScissorTest(ae),i){let r=U.get(e.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=U.get(e.textures[t]);V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=U.get(e.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,t.__webglTexture,n)}N=-1};function Mt(e){let t=U.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Oe.textureFormatReadable(e.format),t.__typeReadable=Oe.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){st(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=U.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){H.bindFramebuffer(V.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+s);let u=Mt(o);if(u.__formatReadable===!1){st(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){st(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&V.readPixels(t,n,r,i,Ye.convert(c),Ye.convert(l),a)}finally{let e=M===null?null:U.get(M).__webglFramebuffer;H.bindFramebuffer(V.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=U.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){H.bindFramebuffer(V.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+s);let d=Mt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=V.createBuffer();V.bindBuffer(V.PIXEL_PACK_BUFFER,f),V.bufferData(V.PIXEL_PACK_BUFFER,a.byteLength,V.STREAM_READ),V.readPixels(t,n,r,i,Ye.convert(l),Ye.convert(u),0),V.bindBuffer(V.PIXEL_PACK_BUFFER,null);let p=M===null?null:U.get(M).__webglFramebuffer;H.bindFramebuffer(V.FRAMEBUFFER,p);let m=V.fenceSync(V.SYNC_GPU_COMMANDS_COMPLETE,0);return V.flush(),await wt(V,m,4),V.bindBuffer(V.PIXEL_PACK_BUFFER,f),V.getBufferSubData(V.PIXEL_PACK_BUFFER,0,a),V.bindBuffer(V.PIXEL_PACK_BUFFER,null),V.deleteBuffer(f),V.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;W.setTexture2D(e,0),V.copyTexSubImage2D(V.TEXTURE_2D,n,0,0,o,s,i,a),H.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Ye.convert(t.format),_=Ye.convert(t.type),v;t.isData3DTexture?(W.setTexture3D(t,0),v=V.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(W.setTexture2DArray(t,0),v=V.TEXTURE_2D_ARRAY):(W.setTexture2D(t,0),v=V.TEXTURE_2D),H.activeTexture(V.TEXTURE0),H.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,t.flipY),H.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),H.pixelStorei(V.UNPACK_ALIGNMENT,t.unpackAlignment);let y=H.getParameter(V.UNPACK_ROW_LENGTH),b=H.getParameter(V.UNPACK_IMAGE_HEIGHT),x=H.getParameter(V.UNPACK_SKIP_PIXELS),S=H.getParameter(V.UNPACK_SKIP_ROWS),C=H.getParameter(V.UNPACK_SKIP_IMAGES);H.pixelStorei(V.UNPACK_ROW_LENGTH,h.width),H.pixelStorei(V.UNPACK_IMAGE_HEIGHT,h.height),H.pixelStorei(V.UNPACK_SKIP_PIXELS,l),H.pixelStorei(V.UNPACK_SKIP_ROWS,u),H.pixelStorei(V.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=U.get(e),r=U.get(t),h=U.get(n.__renderTarget),g=U.get(r.__renderTarget);H.bindFramebuffer(V.READ_FRAMEBUFFER,h.__webglFramebuffer),H.bindFramebuffer(V.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,U.get(e).__webglTexture,i,d+n),V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,U.get(t).__webglTexture,a,m+n)),V.blitFramebuffer(l,u,o,s,f,p,o,s,V.DEPTH_BUFFER_BIT,V.NEAREST);H.bindFramebuffer(V.READ_FRAMEBUFFER,null),H.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||U.has(e)){let n=U.get(e),r=U.get(t);H.bindFramebuffer(V.READ_FRAMEBUFFER,A),H.bindFramebuffer(V.DRAW_FRAMEBUFFER,te);for(let e=0;e<c;e++)w?V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):V.framebufferTexture2D(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,n.__webglTexture,i),T?V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):V.framebufferTexture2D(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,r.__webglTexture,a),i===0?T?V.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):V.copyTexSubImage2D(v,a,f,p,l,u,o,s):V.blitFramebuffer(l,u,o,s,f,p,o,s,V.COLOR_BUFFER_BIT,V.NEAREST);H.bindFramebuffer(V.READ_FRAMEBUFFER,null),H.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?V.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?V.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):V.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):V.texSubImage2D(V.TEXTURE_2D,a,f,p,o,s,g,_,h);H.pixelStorei(V.UNPACK_ROW_LENGTH,y),H.pixelStorei(V.UNPACK_IMAGE_HEIGHT,b),H.pixelStorei(V.UNPACK_SKIP_PIXELS,x),H.pixelStorei(V.UNPACK_SKIP_ROWS,S),H.pixelStorei(V.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&V.generateMipmap(v),H.unbindTexture()},this.initRenderTarget=function(e){U.get(e).__webglFramebuffer===void 0&&W.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?W.setTextureCube(e,0):e.isData3DTexture?W.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?W.setTexture2DArray(e,0):W.setTexture2D(e,0),H.unbindTexture()},this.resetState=function(){j=0,ne=0,M=null,H.reset(),Xe.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return ht}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ee._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ee._getUnpackColorSpace()}};function ea(e){let t=new Map,n=new Map,r=e.clone();return ta(e,r,function(e,r){t.set(r,e),n.set(e,r)}),r.traverse(function(e){if(!e.isSkinnedMesh)return;let r=e,i=t.get(e),a=i.skeleton.bones;r.skeleton=i.skeleton.clone(),r.bindMatrix.copy(i.bindMatrix),r.skeleton.bones=a.map(function(e){return n.get(e)}),r.bind(r.skeleton,r.bindMatrix)}),r}function ta(e,t,n){n(e,t);for(let r=0;r<e.children.length;r++)ta(e.children[r],t.children[r],n)}var na=class extends Ie{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new ca(e)}),this.register(function(e){return new la(e)}),this.register(function(e){return new va(e)}),this.register(function(e){return new ya(e)}),this.register(function(e){return new ba(e)}),this.register(function(e){return new da(e)}),this.register(function(e){return new fa(e)}),this.register(function(e){return new pa(e)}),this.register(function(e){return new ma(e)}),this.register(function(e){return new sa(e)}),this.register(function(e){return new ha(e)}),this.register(function(e){return new ua(e)}),this.register(function(e){return new _a(e)}),this.register(function(e){return new ga(e)}),this.register(function(e){return new aa(e)}),this.register(function(e){return new xa(e,X.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new xa(e,X.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new Sa(e)})}load(e,t,n,r){let i=this,a;if(this.resourcePath!==``)a=this.resourcePath;else if(this.path!==``){let t=ct.extractUrlBase(e);a=ct.resolveURL(t,this.path)}else a=ct.extractUrlBase(e);this.manager.itemStart(e);let o=function(t){r?r(t):console.error(t),i.manager.itemError(e),i.manager.itemEnd(e)},s=new A(this.manager);s.setPath(this.path),s.setResponseType(`arraybuffer`),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,function(n){try{i.parse(n,a,function(n){t(n),i.manager.itemEnd(e)},o)}catch(e){o(e)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let i,a={},o={},s=new TextDecoder;if(typeof e==`string`)i=JSON.parse(e);else if(e instanceof ArrayBuffer){if(s.decode(new Uint8Array(e,0,4))===Ca){try{a[X.KHR_BINARY_GLTF]=new Ea(e)}catch(e){r&&r(e);return}i=JSON.parse(a[X.KHR_BINARY_GLTF].content)}else i=JSON.parse(s.decode(e))}else i=e;if(i.asset===void 0||i.asset.version[0]<2){r&&r(Error(`THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.`));return}let c=new Qa(i,{path:t||this.resourcePath||``,crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let e=0;e<this.pluginCallbacks.length;e++){let t=this.pluginCallbacks[e](c);t.name||console.error(`THREE.GLTFLoader: Invalid plugin found: missing name`),o[t.name]=t,a[t.name]=!0}if(i.extensionsUsed)for(let e=0;e<i.extensionsUsed.length;++e){let t=i.extensionsUsed[e],n=i.extensionsRequired||[];switch(t){case X.KHR_MATERIALS_UNLIT:a[t]=new oa;break;case X.KHR_DRACO_MESH_COMPRESSION:a[t]=new Da(i,this.dracoLoader);break;case X.KHR_TEXTURE_TRANSFORM:a[t]=new Oa;break;case X.KHR_MESH_QUANTIZATION:a[t]=new ka;break;default:n.indexOf(t)>=0&&o[t]===void 0&&console.warn(`THREE.GLTFLoader: Unknown extension "`+t+`".`)}}c.setExtensions(a),c.setPlugins(o),c.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,i){n.parse(e,t,r,i)})}};function ra(){let e={};return{get:function(t){return e[t]},add:function(t,n){e[t]=n},remove:function(t){delete e[t]},removeAll:function(){e={}}}}function ia(e,t,n){let r=e.json.materials[t];return r.extensions&&r.extensions[n]?r.extensions[n]:null}var X={KHR_BINARY_GLTF:`KHR_binary_glTF`,KHR_DRACO_MESH_COMPRESSION:`KHR_draco_mesh_compression`,KHR_LIGHTS_PUNCTUAL:`KHR_lights_punctual`,KHR_MATERIALS_CLEARCOAT:`KHR_materials_clearcoat`,KHR_MATERIALS_DISPERSION:`KHR_materials_dispersion`,KHR_MATERIALS_IOR:`KHR_materials_ior`,KHR_MATERIALS_SHEEN:`KHR_materials_sheen`,KHR_MATERIALS_SPECULAR:`KHR_materials_specular`,KHR_MATERIALS_TRANSMISSION:`KHR_materials_transmission`,KHR_MATERIALS_IRIDESCENCE:`KHR_materials_iridescence`,KHR_MATERIALS_ANISOTROPY:`KHR_materials_anisotropy`,KHR_MATERIALS_UNLIT:`KHR_materials_unlit`,KHR_MATERIALS_VOLUME:`KHR_materials_volume`,KHR_TEXTURE_BASISU:`KHR_texture_basisu`,KHR_TEXTURE_TRANSFORM:`KHR_texture_transform`,KHR_MESH_QUANTIZATION:`KHR_mesh_quantization`,KHR_MATERIALS_EMISSIVE_STRENGTH:`KHR_materials_emissive_strength`,EXT_MATERIALS_BUMP:`EXT_materials_bump`,EXT_TEXTURE_WEBP:`EXT_texture_webp`,EXT_TEXTURE_AVIF:`EXT_texture_avif`,EXT_MESHOPT_COMPRESSION:`EXT_meshopt_compression`,KHR_MESHOPT_COMPRESSION:`KHR_meshopt_compression`,EXT_MESH_GPU_INSTANCING:`EXT_mesh_gpu_instancing`},aa=class{constructor(e){this.parser=e,this.name=X.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n=`light:`+e,r=t.cache.get(n);if(r)return r;let i=t.json,a=((i.extensions&&i.extensions[this.name]||{}).lights||[])[e],o,s=new q(16777215);a.color!==void 0&&s.setRGB(a.color[0],a.color[1],a.color[2],St);let c=a.range===void 0?0:a.range;switch(a.type){case`directional`:o=new ne(s),o.target.position.set(0,0,-1),o.add(o.target);break;case`point`:o=new v(s),o.distance=c;break;case`spot`:o=new z(s),o.distance=c,a.spot=a.spot||{},a.spot.innerConeAngle=a.spot.innerConeAngle===void 0?0:a.spot.innerConeAngle,a.spot.outerConeAngle=a.spot.outerConeAngle===void 0?Math.PI/4:a.spot.outerConeAngle,o.angle=a.spot.outerConeAngle,o.penumbra=1-a.spot.innerConeAngle/a.spot.outerConeAngle,o.target.position.set(0,0,-1),o.add(o.target);break;default:throw Error(`THREE.GLTFLoader: Unexpected light type: `+a.type)}return o.position.set(0,0,0),Wa(o,a),a.intensity!==void 0&&(o.intensity=a.intensity),o.name=t.createUniqueName(a.name||`light_`+e),r=Promise.resolve(o),t.cache.add(n,r),r}getDependency(e,t){if(e===`light`)return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],i=(r.extensions&&r.extensions[this.name]||{}).light;return i===void 0?null:this._loadLight(i).then(function(e){return n._getNodeRef(t.cache,i,e)})}},oa=class{constructor(){this.name=X.KHR_MATERIALS_UNLIT}getMaterialType(){return Oe}extendParams(e,t,n){let r=[];e.color=new q(1,1,1),e.opacity=1;let i=t.pbrMetallicRoughness;if(i){if(Array.isArray(i.baseColorFactor)){let t=i.baseColorFactor;e.color.setRGB(t[0],t[1],t[2],St),e.opacity=t[3]}i.baseColorTexture!==void 0&&r.push(n.assignTexture(e,`map`,i.baseColorTexture,se))}return Promise.all(r)}},sa=class{constructor(e){this.parser=e,this.name=X.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=ia(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},ca=class{constructor(e){this.parser=e,this.name=X.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return ia(this.parser,e,this.name)===null?null:l}extendMaterialParams(e,t){let n=ia(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatMap`,n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatRoughnessMap`,n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(r.push(this.parser.assignTexture(t,`clearcoatNormalMap`,n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let e=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new pt(e,e)}return Promise.all(r)}},la=class{constructor(e){this.parser=e,this.name=X.KHR_MATERIALS_DISPERSION}getMaterialType(e){return ia(this.parser,e,this.name)===null?null:l}extendMaterialParams(e,t){let n=ia(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion===void 0?0:n.dispersion),Promise.resolve()}},ua=class{constructor(e){this.parser=e,this.name=X.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return ia(this.parser,e,this.name)===null?null:l}extendMaterialParams(e,t){let n=ia(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceMap`,n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceThicknessMap`,n.iridescenceThicknessTexture)),Promise.all(r)}},da=class{constructor(e){this.parser=e,this.name=X.KHR_MATERIALS_SHEEN}getMaterialType(e){return ia(this.parser,e,this.name)===null?null:l}extendMaterialParams(e,t){let n=ia(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(t.sheenColor=new q(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let e=n.sheenColorFactor;t.sheenColor.setRGB(e[0],e[1],e[2],St)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenColorMap`,n.sheenColorTexture,se)),n.sheenRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenRoughnessMap`,n.sheenRoughnessTexture)),Promise.all(r)}},fa=class{constructor(e){this.parser=e,this.name=X.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return ia(this.parser,e,this.name)===null?null:l}extendMaterialParams(e,t){let n=ia(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&r.push(this.parser.assignTexture(t,`transmissionMap`,n.transmissionTexture)),Promise.all(r)}},pa=class{constructor(e){this.parser=e,this.name=X.KHR_MATERIALS_VOLUME}getMaterialType(e){return ia(this.parser,e,this.name)===null?null:l}extendMaterialParams(e,t){let n=ia(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.thickness=n.thicknessFactor===void 0?0:n.thicknessFactor,n.thicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`thicknessMap`,n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let i=n.attenuationColor||[1,1,1];return t.attenuationColor=new q().setRGB(i[0],i[1],i[2],St),Promise.all(r)}},ma=class{constructor(e){this.parser=e,this.name=X.KHR_MATERIALS_IOR}getMaterialType(e){return ia(this.parser,e,this.name)===null?null:l}extendMaterialParams(e,t){let n=ia(this.parser,e,this.name);return n===null||(t.ior=n.ior===void 0?1.5:n.ior,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},ha=class{constructor(e){this.parser=e,this.name=X.KHR_MATERIALS_SPECULAR}getMaterialType(e){return ia(this.parser,e,this.name)===null?null:l}extendMaterialParams(e,t){let n=ia(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.specularIntensity=n.specularFactor===void 0?1:n.specularFactor,n.specularTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularIntensityMap`,n.specularTexture));let i=n.specularColorFactor||[1,1,1];return t.specularColor=new q().setRGB(i[0],i[1],i[2],St),n.specularColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularColorMap`,n.specularColorTexture,se)),Promise.all(r)}},ga=class{constructor(e){this.parser=e,this.name=X.EXT_MATERIALS_BUMP}getMaterialType(e){return ia(this.parser,e,this.name)===null?null:l}extendMaterialParams(e,t){let n=ia(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return t.bumpScale=n.bumpFactor===void 0?1:n.bumpFactor,n.bumpTexture!==void 0&&r.push(this.parser.assignTexture(t,`bumpMap`,n.bumpTexture)),Promise.all(r)}},_a=class{constructor(e){this.parser=e,this.name=X.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return ia(this.parser,e,this.name)===null?null:l}extendMaterialParams(e,t){let n=ia(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&r.push(this.parser.assignTexture(t,`anisotropyMap`,n.anisotropyTexture)),Promise.all(r)}},va=class{constructor(e){this.parser=e,this.name=X.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let i=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures`);return null}return t.loadTextureImage(e,i.source,a)}},ya=class{constructor(e){this.parser=e,this.name=X.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},ba=class{constructor(e){this.parser=e,this.name=X.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},xa=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let e=n.extensions[this.name],r=this.parser.getDependency(`buffer`,e.buffer),i=this.parser.options.meshoptDecoder;if(!i||!i.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files`);return null}return r.then(function(t){let n=e.byteOffset||0,r=e.byteLength||0,a=e.count,o=e.byteStride,s=new Uint8Array(t,n,r);return i.decodeGltfBufferAsync?i.decodeGltfBufferAsync(a,o,s,e.mode,e.filter).then(function(e){return e.buffer}):i.ready.then(function(){let t=new ArrayBuffer(a*o);return i.decodeGltfBuffer(new Uint8Array(t),a,o,s,e.mode,e.filter),t})})}return null}},Sa=class{constructor(e){this.name=X.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let e of i.primitives)if(e.mode!==Na.TRIANGLES&&e.mode!==Na.TRIANGLE_STRIP&&e.mode!==Na.TRIANGLE_FAN&&e.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],s={};for(let e in a)o.push(this.parser.getDependency(`accessor`,a[e]).then(t=>(s[e]=t,s[e])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(e=>{let t=e.pop(),n=t.isGroup?t.children:[t],i=e[0].count,a=[];for(let e of n){let t=new Tt,n=new G,o=new Ft,c=new G(1,1,1),l=new ve(e.geometry,e.material,i);for(let e=0;e<i;e++)s.TRANSLATION&&n.fromBufferAttribute(s.TRANSLATION,e),s.ROTATION&&o.fromBufferAttribute(s.ROTATION,e),s.SCALE&&c.fromBufferAttribute(s.SCALE,e),l.setMatrixAt(e,t.compose(n,o,c));let u=null;for(let e in s)if(e===`_COLOR_0`){let t=s[e];l.instanceColor=new lt(t.array,t.itemSize,t.normalized)}else if(e!==`TRANSLATION`&&e!==`ROTATION`&&e!==`SCALE`){if(u===null){let e=l.geometry;u=new ze,u.name=e.name;for(let t in e.attributes)u.setAttribute(t,e.attributes[t]);for(let t in e.morphAttributes)u.morphAttributes[t]=e.morphAttributes[t];e.index!==null&&u.setIndex(e.index),u.morphTargetsRelative=e.morphTargetsRelative;for(let t of e.groups)u.addGroup(t.start,t.count,t.materialIndex);e.boundingBox!==null&&(u.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(u.boundingSphere=e.boundingSphere.clone()),u.drawRange.start=e.drawRange.start,u.drawRange.count=e.drawRange.count,u.userData=Object.assign({},e.userData),l.geometry=u}let t=s[e];u.setAttribute(e,new lt(t.array,t.itemSize,t.normalized))}r.prototype.copy.call(l,e),this.parser.assignFinalMaterial(l),a.push(l)}return t.isGroup?(t.clear(),t.add(...a),t):a[0]}))}},Ca=`glTF`,wa=12,Ta={JSON:1313821514,BIN:5130562},Ea=class{constructor(e){this.name=X.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,wa),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Ca)throw Error(`THREE.GLTFLoader: Unsupported glTF-Binary header.`);if(this.header.version<2)throw Error(`THREE.GLTFLoader: Legacy binary file detected.`);let r=this.header.length-wa,i=new DataView(e,wa),a=0;for(;a<r;){let t=i.getUint32(a,!0);a+=4;let r=i.getUint32(a,!0);if(a+=4,r===Ta.JSON){let r=new Uint8Array(e,wa+a,t);this.content=n.decode(r)}else if(r===Ta.BIN){let n=wa+a;this.body=e.slice(n,n+t)}a+=t}if(this.content===null)throw Error(`THREE.GLTFLoader: JSON content not found.`)}},Da=class{constructor(e,t){if(!t)throw Error(`THREE.GLTFLoader: No DRACOLoader instance provided.`);this.name=X.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,i=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},s={},c={};for(let e in a){let t=Ra[e]||e.toLowerCase();o[t]=a[e]}for(let t in e.attributes){let r=Ra[t]||t.toLowerCase();if(a[t]!==void 0){let i=n.accessors[e.attributes[t]];c[r]=Pa[i.componentType].name,s[r]=i.normalized===!0}}return t.getDependency(`bufferView`,i).then(function(e){return new Promise(function(t,n){r.decodeDracoFile(e,function(e){for(let t in e.attributes){let n=e.attributes[t],r=s[t];r!==void 0&&(n.normalized=r)}t(e)},o,c,St,n)})})}},Oa=class{constructor(){this.name=X.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let t=Math.cos(e.rotation),n=Math.sin(e.rotation);e.matrix.set(e.repeat.x*t,e.repeat.y*n,e.offset.x,-e.repeat.x*n,e.repeat.y*t,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},ka=class{constructor(){this.name=X.KHR_MESH_QUANTIZATION}},Aa=class extends e{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r*3+r;for(let e=0;e!==r;e++)t[e]=n[i+e];return t}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=o*2,c=o*3,l=r-t,u=(n-t)/l,d=u*u,f=d*u,p=e*c,m=p-c,h=-2*f+3*d,g=f-d,_=1-h,v=g-d+u;for(let e=0;e!==o;e++){let t=a[m+e+o],n=a[m+e+s]*l,r=a[p+e+o],c=a[p+e]*l;i[e]=_*t+v*n+h*r+g*c}return i}},ja=new Ft,Ma=class extends Aa{interpolate_(e,t,n,r){let i=super.interpolate_(e,t,n,r);return ja.fromArray(i).normalize().toArray(i),i}},Na={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Pa={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Fa={9728:h,9729:gt,9984:ae,9985:Ze,9986:f,9987:Ae},Ia={33071:Ct,33648:fe,10497:ie},La={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ra={POSITION:`position`,NORMAL:`normal`,TANGENT:`tangent`,TEXCOORD_0:`uv`,TEXCOORD_1:`uv1`,TEXCOORD_2:`uv2`,TEXCOORD_3:`uv3`,COLOR_0:`color`,WEIGHTS_0:`skinWeight`,JOINTS_0:`skinIndex`},za={scale:`scale`,translation:`position`,rotation:`quaternion`,weights:`morphTargetInfluences`},Ba={CUBICSPLINE:void 0,LINEAR:yt,STEP:W},Va={OPAQUE:`OPAQUE`,MASK:`MASK`,BLEND:`BLEND`};function Ha(e){return e.DefaultMaterial===void 0&&(e.DefaultMaterial=new Ot({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:0})),e.DefaultMaterial}function Ua(e,t,n){for(let r in n.extensions)e[r]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[r]=n.extensions[r])}function Wa(e,t){t.extras!==void 0&&(typeof t.extras==`object`?Object.assign(e.userData,t.extras):console.warn(`THREE.GLTFLoader: Ignoring primitive type .extras, `+t.extras))}function Ga(e,t,n){let r=!1,i=!1,a=!1;for(let e=0,n=t.length;e<n;e++){let n=t[e];if(n.POSITION!==void 0&&(r=!0),n.NORMAL!==void 0&&(i=!0),n.COLOR_0!==void 0&&(a=!0),r&&i&&a)break}if(!r&&!i&&!a)return Promise.resolve(e);let o=[],s=[],c=[];for(let l=0,u=t.length;l<u;l++){let u=t[l];if(r){let t=u.POSITION===void 0?e.attributes.position:n.getDependency(`accessor`,u.POSITION);o.push(t)}if(i){let t=u.NORMAL===void 0?e.attributes.normal:n.getDependency(`accessor`,u.NORMAL);s.push(t)}if(a){let t=u.COLOR_0===void 0?e.attributes.color:n.getDependency(`accessor`,u.COLOR_0);c.push(t)}}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(c)]).then(function(t){let n=t[0],o=t[1],s=t[2];return r&&(e.morphAttributes.position=n),i&&(e.morphAttributes.normal=o),a&&(e.morphAttributes.color=s),e.morphTargetsRelative=!0,e})}function Ka(e,t){if(e.updateMorphTargets(),t.weights!==void 0)for(let n=0,r=t.weights.length;n<r;n++)e.morphTargetInfluences[n]=t.weights[n];if(t.extras&&Array.isArray(t.extras.targetNames)){let n=t.extras.targetNames;if(e.morphTargetInfluences.length===n.length){e.morphTargetDictionary={};for(let t=0,r=n.length;t<r;t++)e.morphTargetDictionary[n[t]]=t}else console.warn(`THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.`)}}function qa(e){let t,n=e.extensions&&e.extensions[X.KHR_DRACO_MESH_COMPRESSION];if(t=n?`draco:`+n.bufferView+`:`+n.indices+`:`+Ja(n.attributes):e.indices+`:`+Ja(e.attributes)+`:`+e.mode,e.targets!==void 0)for(let n=0,r=e.targets.length;n<r;n++)t+=`:`+Ja(e.targets[n]);return t}function Ja(e){let t=``,n=Object.keys(e).sort();for(let r=0,i=n.length;r<i;r++)t+=n[r]+`:`+e[n[r]]+`;`;return t}function Ya(e){switch(e){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw Error(`THREE.GLTFLoader: Unsupported normalized accessor component type.`)}}function Xa(e){return e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0?`image/jpeg`:e.search(/\.webp($|\?)/i)>0||e.search(/^data\:image\/webp/)===0?`image/webp`:e.search(/\.ktx2($|\?)/i)>0||e.search(/^data\:image\/ktx2/)===0?`image/ktx2`:`image/png`}var Za=new Tt,Qa=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new ra,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,i=!1,a=-1;if(typeof navigator<`u`&&navigator.userAgent!==void 0){let e=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(e)===!0;let t=e.match(/Version\/(\d+)/);r=n&&t?parseInt(t[1],10):-1,i=e.indexOf(`Firefox`)>-1,a=i?e.match(/Firefox\/([0-9]+)\./)[1]:-1}this.textureLoader=typeof createImageBitmap>`u`||n&&r<17||i&&a<98?new b(this.options.manager):new O(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new A(this.options.manager),this.fileLoader.setResponseType(`arraybuffer`),this.options.crossOrigin===`use-credentials`&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,i=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(e){return e._markDefs&&e._markDefs()}),Promise.all(this._invokeAll(function(e){return e.beforeRoot&&e.beforeRoot()})).then(function(){return Promise.all([n.getDependencies(`scene`),n.getDependencies(`animation`),n.getDependencies(`camera`)])}).then(function(t){let a={scene:t[0][r.scene||0],scenes:t[0],animations:t[1],cameras:t[2],asset:r.asset,parser:n,userData:{}};return Ua(i,a,r),Wa(a,r),Promise.all(n._invokeAll(function(e){return e.afterRoot&&e.afterRoot(a)})).then(function(){for(let e of a.scenes)e.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n].joints;for(let t=0,n=r.length;t<n;t++)e[r[t]].isBone=!0}for(let t=0,r=e.length;t<r;t++){let r=e[t];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),i=(e,t)=>{let n=this.associations.get(e);n!=null&&this.associations.set(t,n);for(let[n,r]of e.children.entries())i(r,t.children[n])};return i(n,r),r.name+=`_instance_`+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let i=e(t[r]);i&&n.push(i)}return n}getDependency(e,t){let n=e+`:`+t,r=this.cache.get(n);if(!r){switch(e){case`scene`:r=this.loadScene(t);break;case`node`:r=this._invokeOne(function(e){return e.loadNode&&e.loadNode(t)});break;case`mesh`:r=this._invokeOne(function(e){return e.loadMesh&&e.loadMesh(t)});break;case`accessor`:r=this.loadAccessor(t);break;case`bufferView`:r=this._invokeOne(function(e){return e.loadBufferView&&e.loadBufferView(t)});break;case`buffer`:r=this.loadBuffer(t);break;case`material`:r=this._invokeOne(function(e){return e.loadMaterial&&e.loadMaterial(t)});break;case`texture`:r=this._invokeOne(function(e){return e.loadTexture&&e.loadTexture(t)});break;case`skin`:r=this.loadSkin(t);break;case`animation`:r=this._invokeOne(function(e){return e.loadAnimation&&e.loadAnimation(t)});break;case`camera`:r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(n){return n!=this&&n.getDependency&&n.getDependency(e,t)}),!r)throw Error(`Unknown type: `+e)}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e===`mesh`?`es`:`s`)]||[];t=Promise.all(r.map(function(t,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!==`arraybuffer`)throw Error(`THREE.GLTFLoader: `+t.type+` buffer type is not supported.`);if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[X.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(e,i){n.load(ct.resolveURL(t.uri,r.path),e,void 0,function(){i(Error(`THREE.GLTFLoader: Failed to load buffer "`+t.uri+`".`))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency(`buffer`,t.buffer).then(function(e){let n=t.byteLength||0,r=t.byteOffset||0;return e.slice(r,r+n)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let e=La[r.type],t=Pa[r.componentType],n=r.normalized===!0,i=new t(r.count*e);return Promise.resolve(new K(i,e,n))}let i=[];return r.bufferView===void 0?i.push(null):i.push(this.getDependency(`bufferView`,r.bufferView)),r.sparse!==void 0&&(i.push(this.getDependency(`bufferView`,r.sparse.indices.bufferView)),i.push(this.getDependency(`bufferView`,r.sparse.values.bufferView))),Promise.all(i).then(function(e){let i=e[0],a=La[r.type],o=Pa[r.componentType],s=o.BYTES_PER_ELEMENT,c=s*a,l=r.byteOffset||0,u=r.bufferView===void 0?void 0:n.bufferViews[r.bufferView].byteStride,d=r.normalized===!0,f,p;if(u&&u!==c){let e=Math.floor(l/u),n=`InterleavedBuffer:`+r.bufferView+`:`+r.componentType+`:`+e+`:`+r.count,c=t.cache.get(n);c||(f=new o(i,e*u,r.count*u/s),c=new be(f,u/s),t.cache.add(n,c)),p=new F(c,a,l%u/s,d)}else f=i===null?new o(r.count*a):new o(i,l,r.count*a),p=new K(f,a,d);if(r.sparse!==void 0){let t=La.SCALAR,n=Pa[r.sparse.indices.componentType],s=r.sparse.indices.byteOffset||0,c=r.sparse.values.byteOffset||0,l=new n(e[1],s,r.sparse.count*t),u=new o(e[2],c,r.sparse.count*a);i!==null&&(p=new K(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let e=0,t=l.length;e<t;e++){let t=l[e];if(p.setX(t,u[e*a]),a>=2&&p.setY(t,u[e*a+1]),a>=3&&p.setZ(t,u[e*a+2]),a>=4&&p.setW(t,u[e*a+3]),a>=5)throw Error(`THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.`)}p.normalized=d}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,i=t.images[r],a=this.textureLoader;if(i.uri){let e=n.manager.getHandler(i.uri);e!==null&&(a=e)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let r=this,i=this.json,a=i.textures[e],o=i.images[t],s=(o.uri||o.bufferView)+`:`+a.sampler;if(this.textureCache[s])return this.textureCache[s];let c=this.loadImageSource(t,n).then(function(t){t.flipY=!1,t.name=a.name||o.name||``,t.name===``&&typeof o.uri==`string`&&o.uri.startsWith(`data:image/`)===!1&&(t.name=o.uri);let n=(i.samplers||{})[a.sampler]||{};return t.magFilter=Fa[n.magFilter]||1006,t.minFilter=Fa[n.minFilter]||1008,t.wrapS=Ia[n.wrapS]||1e3,t.wrapT=Ia[n.wrapT]||1e3,t.generateMipmaps=!t.isCompressedTexture&&t.minFilter!==1003&&t.minFilter!==1006,r.associations.set(t,{textures:e}),t}).catch(function(){return null});return this.textureCache[s]=c,c}loadImageSource(e,t){let n=this,r=this.json,i=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(e=>e.clone());let a=r.images[e],o=self.URL||self.webkitURL,s=a.uri||``,c=!1;if(a.bufferView!==void 0)s=n.getDependency(`bufferView`,a.bufferView).then(function(e){c=!0;let t=new Blob([e],{type:a.mimeType});return s=o.createObjectURL(t),s});else if(a.uri===void 0)throw Error(`THREE.GLTFLoader: Image `+e+` is missing URI and bufferView`);let l=Promise.resolve(s).then(function(e){return new Promise(function(n,r){let a=n;t.isImageBitmapLoader===!0&&(a=function(e){let t=new _e(e);t.needsUpdate=!0,n(t)}),t.load(ct.resolveURL(e,i.path),a,void 0,r)})}).then(function(e){return c===!0&&o.revokeObjectURL(s),Wa(e,a),e.userData.mimeType=a.mimeType||Xa(a.uri),e}).catch(function(e){throw console.error(`THREE.GLTFLoader: Couldn't load texture`,s),e});return this.sourceCache[e]=l,l}assignTexture(e,t,n,r){let i=this;return this.getDependency(`texture`,n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),i.extensions[X.KHR_TEXTURE_TRANSFORM]){let e=n.extensions===void 0?void 0:n.extensions[X.KHR_TEXTURE_TRANSFORM];if(e){let t=i.associations.get(a);a=i.extensions[X.KHR_TEXTURE_TRANSFORM].extendTexture(a,e),i.associations.set(a,t)}}return r!==void 0&&(a.colorSpace=r),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,i=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let e=`PointsMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new j,Ve.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,t.sizeAttenuation=!1,this.cache.add(e,t)),n=t}else if(e.isLine){let e=`LineBasicMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new Ue,Ve.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,this.cache.add(e,t)),n=t}if(r||i||a){let e=`ClonedMaterial:`+n.uuid+`:`;r&&(e+=`derivative-tangents:`),i&&(e+=`vertex-colors:`),a&&(e+=`flat-shading:`);let t=this.cache.get(e);t||(t=n.clone(),i&&(t.vertexColors=!0),a&&(t.flatShading=!0),r&&(t.normalScale&&(t.normalScale.y*=-1),t.clearcoatNormalScale&&(t.clearcoatNormalScale.y*=-1)),this.cache.add(e,t),this.associations.set(t,this.associations.get(n))),n=t}e.material=n}getMaterialType(){return Ot}loadMaterial(e){let t=this,n=this.json,r=this.extensions,i=n.materials[e],a,o={},s=i.extensions||{},c=[];if(s[X.KHR_MATERIALS_UNLIT]){let e=r[X.KHR_MATERIALS_UNLIT];a=e.getMaterialType(),c.push(e.extendParams(o,i,t))}else{let n=i.pbrMetallicRoughness||{};if(o.color=new q(1,1,1),o.opacity=1,Array.isArray(n.baseColorFactor)){let e=n.baseColorFactor;o.color.setRGB(e[0],e[1],e[2],St),o.opacity=e[3]}n.baseColorTexture!==void 0&&c.push(t.assignTexture(o,`map`,n.baseColorTexture,se)),o.metalness=n.metallicFactor===void 0?1:n.metallicFactor,o.roughness=n.roughnessFactor===void 0?1:n.roughnessFactor,n.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,`metalnessMap`,n.metallicRoughnessTexture)),c.push(t.assignTexture(o,`roughnessMap`,n.metallicRoughnessTexture))),a=this._invokeOne(function(t){return t.getMaterialType&&t.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(t){return t.extendMaterialParams&&t.extendMaterialParams(e,o)})))}i.doubleSided===!0&&(o.side=2);let l=i.alphaMode||Va.OPAQUE;if(l===Va.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,l===Va.MASK&&(o.alphaTest=i.alphaCutoff===void 0?.5:i.alphaCutoff)),i.normalTexture!==void 0&&a!==Oe&&(c.push(t.assignTexture(o,`normalMap`,i.normalTexture)),o.normalScale=new pt(1,1),i.normalTexture.scale!==void 0)){let e=i.normalTexture.scale;o.normalScale.set(e,e)}if(i.occlusionTexture!==void 0&&a!==Oe&&(c.push(t.assignTexture(o,`aoMap`,i.occlusionTexture)),i.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=i.occlusionTexture.strength)),i.emissiveFactor!==void 0&&a!==Oe){let e=i.emissiveFactor;o.emissive=new q().setRGB(e[0],e[1],e[2],St)}return i.emissiveTexture!==void 0&&a!==Oe&&c.push(t.assignTexture(o,`emissiveMap`,i.emissiveTexture,se)),Promise.all(c).then(function(){let n=new a(o);return i.name&&(n.name=i.name),Wa(n,i),t.associations.set(n,{materials:e}),i.extensions&&Ua(r,n,i),n})}createUniqueName(e){let t=L.sanitizeNodeName(e||``);return t in this.nodeNamesUsed?t+`_`+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function i(e){return n[X.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e,t).then(function(n){return eo(n,e,t)})}let a=[];for(let n=0,o=e.length;n<o;n++){let o=e[n],s=qa(o),c=r[s];if(c)a.push(c.promise);else{let e;e=o.extensions&&o.extensions[X.KHR_DRACO_MESH_COMPRESSION]?i(o):eo(new ze,o,t),o.mode===Na.TRIANGLE_STRIP?e=e.then(e=>rt(e,1)):o.mode===Na.TRIANGLE_FAN&&(e=e.then(e=>rt(e,2))),r[s]={primitive:o,promise:e},a.push(e)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,r=this.extensions,i=n.meshes[e],o=i.primitives,s=[];for(let e=0,t=o.length;e<t;e++){let t=o[e].material===void 0?Ha(this.cache):this.getDependency(`material`,o[e].material);s.push(t)}return s.push(t.loadGeometries(o)),Promise.all(s).then(async function(n){let s=n.slice(0,n.length-1),c=n[n.length-1],l=[];for(let n=0,u=c.length;n<u;n++){let u=c[n],d=o[n],f,p=s[n];if(d.mode===Na.TRIANGLES||d.mode===Na.TRIANGLE_STRIP||d.mode===Na.TRIANGLE_FAN||d.mode===void 0){let e=i.isSkinnedMesh===!0,t=u.hasAttribute(`skinIndex`)&&u.hasAttribute(`skinWeight`);e&&t===!1&&console.warn(`THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled.`),f=e&&t?new a(u,p):new Mt(u,p),f.isSkinnedMesh===!0&&f.normalizeSkinWeights()}else if(d.mode===Na.LINES)f=new at(u,p);else if(d.mode===Na.LINE_STRIP)f=new mt(u,p);else if(d.mode===Na.LINE_LOOP)f=new Te(u,p);else if(d.mode===Na.POINTS)f=new T(u,p);else throw Error(`THREE.GLTFLoader: Primitive mode unsupported: `+d.mode);Object.keys(f.geometry.morphAttributes).length>0&&Ka(f,i),f.name=t.createUniqueName(i.name||`mesh_`+e),Wa(f,i),d.extensions&&Ua(r,f,d),t.assignFinalMaterial(f),l.push(f)}for(let n=0,r=l.length;n<r;n++)t.associations.set(l[n],{meshes:e,primitives:n});if(l.length===1)return i.extensions&&Ua(r,l[0],i),l[0];let u=new pe;i.extensions&&Ua(r,u,i),t.associations.set(u,{meshes:e});for(let e=0,t=l.length;e<t;e++)u.add(l[e]);return u})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r)console.warn(`THREE.GLTFLoader: Missing camera parameters.`);else return n.type===`perspective`?t=new M(Re.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type===`orthographic`&&(t=new Ge(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Wa(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let e=0,r=t.joints.length;e<r;e++)n.push(this._loadNodeShallow(t.joints[e]));return t.inverseBindMatrices===void 0?n.push(null):n.push(this.getDependency(`accessor`,t.inverseBindMatrices)),Promise.all(n).then(function(e){let n=e.pop(),r=e,i=[],a=[];for(let e=0,o=r.length;e<o;e++){let o=r[e];if(o){i.push(o);let t=new Tt;n!==null&&t.fromArray(n.array,e*16),a.push(t)}else console.warn(`THREE.GLTFLoader: Joint "%s" could not be found.`,t.joints[e])}return new Pt(i,a)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],i=r.name?r.name:`animation_`+e,a=[],o=[],s=[],c=[],l=[];for(let e=0,t=r.channels.length;e<t;e++){let t=r.channels[e],n=r.samplers[t.sampler],i=t.target,u=i.node,d=r.parameters===void 0?n.input:r.parameters[n.input],f=r.parameters===void 0?n.output:r.parameters[n.output];i.node!==void 0&&(a.push(this.getDependency(`node`,u)),o.push(this.getDependency(`accessor`,d)),s.push(this.getDependency(`accessor`,f)),c.push(n),l.push(i))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(s),Promise.all(c),Promise.all(l)]).then(function(e){let t=e[0],a=e[1],o=e[2],s=e[3],c=e[4],l=[];for(let e=0,r=t.length;e<r;e++){let r=t[e],i=a[e],u=o[e],d=s[e],f=c[e];if(r===void 0)continue;r.updateMatrix&&r.updateMatrix();let p=n._createAnimationTracks(r,i,u,d,f);if(p)for(let e=0;e<p.length;e++)l.push(p[e])}let u=new H(i,void 0,l);return Wa(u,r),u})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency(`mesh`,r.mesh).then(function(e){let t=n._getNodeRef(n.meshCache,r.mesh,e);return r.weights!==void 0&&t.traverse(function(e){if(e.isMesh)for(let t=0,n=r.weights.length;t<n;t++)e.morphTargetInfluences[t]=r.weights[t]}),t})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],i=n._loadNodeShallow(e),a=[],o=r.children||[];for(let e=0,t=o.length;e<t;e++)a.push(n.getDependency(`node`,o[e]));let s=r.skin===void 0?Promise.resolve(null):n.getDependency(`skin`,r.skin);return Promise.all([i,Promise.all(a),s]).then(function(e){let t=e[0],n=e[1],r=e[2];r!==null&&t.traverse(function(e){e.isSkinnedMesh&&e.bind(r,Za)});for(let e=0,r=n.length;e<r;e++)t.add(n[e]);if(t.userData.pivot!==void 0&&n.length>0){let e=t.userData.pivot,r=n[0];t.pivot=new G().fromArray(e),t.position.x-=e[0],t.position.y-=e[1],t.position.z-=e[2],r.position.set(0,0,0),delete t.userData.pivot}return t})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let a=t.nodes[e],o=a.name?i.createUniqueName(a.name):``,s=[],c=i._invokeOne(function(t){return t.createNodeMesh&&t.createNodeMesh(e)});return c&&s.push(c),a.camera!==void 0&&s.push(i.getDependency(`camera`,a.camera).then(function(e){return i._getNodeRef(i.cameraCache,a.camera,e)})),i._invokeAll(function(t){return t.createNodeAttachment&&t.createNodeAttachment(e)}).forEach(function(e){s.push(e)}),this.nodeCache[e]=Promise.all(s).then(function(t){let s;if(s=a.isBone===!0?new je:t.length>1?new pe:t.length===1?t[0]:new r,s!==t[0])for(let e=0,n=t.length;e<n;e++)s.add(t[e]);if(a.name&&(s.userData.name=a.name,s.name=o),Wa(s,a),a.extensions&&Ua(n,s,a),a.matrix!==void 0){let e=new Tt;e.fromArray(a.matrix),s.applyMatrix4(e)}else a.translation!==void 0&&s.position.fromArray(a.translation),a.rotation!==void 0&&s.quaternion.fromArray(a.rotation),a.scale!==void 0&&s.scale.fromArray(a.scale);if(!i.associations.has(s))i.associations.set(s,{});else if(a.mesh!==void 0&&i.meshCache.refs[a.mesh]>1){let e=i.associations.get(s);i.associations.set(s,{...e})}return i.associations.get(s).nodes=e,s}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,i=new pe;n.name&&(i.name=r.createUniqueName(n.name)),Wa(i,n),n.extensions&&Ua(t,i,n);let a=n.nodes||[],o=[];for(let e=0,t=a.length;e<t;e++)o.push(r.getDependency(`node`,a[e]));return Promise.all(o).then(function(e){for(let t=0,n=e.length;t<n;t++){let n=e[t];n.parent===null?i.add(n):i.add(ea(n))}return r.associations=(e=>{let t=new Map;for(let[e,n]of r.associations)(e instanceof Ve||e instanceof _e)&&t.set(e,n);return e.traverse(e=>{let n=r.associations.get(e);n!=null&&t.set(e,n)}),t})(i),i})}_createAnimationTracks(e,t,n,r,i){let a=[],s=e.name?e.name:e.uuid,c=[];function l(e){e.morphTargetInfluences&&c.push(e.name?e.name:e.uuid)}za[i.path]===za.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(s);let u;switch(za[i.path]){case za.weights:u=Je;break;case za.rotation:u=o;break;case za.translation:case za.scale:u=it;break;default:switch(n.itemSize){case 1:u=Je;break;default:u=it}}let d=r.interpolation===void 0?yt:Ba[r.interpolation],f=this._getArrayFromAccessor(n);for(let e=0,n=c.length;e<n;e++){let n=new u(c[e]+`.`+za[i.path],t.array,f,d);r.interpolation===`CUBICSPLINE`&&this._createCubicSplineTrackInterpolant(n),a.push(n)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let e=Ya(t.constructor),n=new Float32Array(t.length);for(let r=0,i=t.length;r<i;r++)n[r]=t[r]*e;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(e){return new(this instanceof o?Ma:Aa)(this.times,this.values,this.getValueSize()/3,e)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function $a(e,t,n){let r=t.attributes,i=new Pe;if(r.POSITION!==void 0){let e=n.json.accessors[r.POSITION],t=e.min,a=e.max;if(t!==void 0&&a!==void 0){if(i.set(new G(t[0],t[1],t[2]),new G(a[0],a[1],a[2])),e.normalized){let t=Ya(Pa[e.componentType]);i.min.multiplyScalar(t),i.max.multiplyScalar(t)}}else{console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`);return}}else return;let a=t.targets;if(a!==void 0){let e=new G,t=new G;for(let r=0,i=a.length;r<i;r++){let i=a[r];if(i.POSITION!==void 0){let r=n.json.accessors[i.POSITION],a=r.min,o=r.max;if(a!==void 0&&o!==void 0){if(t.setX(Math.max(Math.abs(a[0]),Math.abs(o[0]))),t.setY(Math.max(Math.abs(a[1]),Math.abs(o[1]))),t.setZ(Math.max(Math.abs(a[2]),Math.abs(o[2]))),r.normalized){let e=Ya(Pa[r.componentType]);t.multiplyScalar(e)}e.max(t)}else console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`)}}i.expandByVector(e)}e.boundingBox=i;let o=new he;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,e.boundingSphere=o}function eo(e,t,n){let r=t.attributes,i=[];function a(t,r){return n.getDependency(`accessor`,t).then(function(t){e.setAttribute(r,t)})}for(let t in r){let n=Ra[t]||t.toLowerCase();n in e.attributes||i.push(a(r[t],n))}if(t.indices!==void 0&&!e.index){let r=n.getDependency(`accessor`,t.indices).then(function(t){e.setIndex(t)});i.push(r)}return Ee.workingColorSpace!==`srgb-linear`&&`COLOR_0`in r&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ee.workingColorSpace}" not supported.`),Wa(e,t),$a(e,t,n),Promise.all(i).then(function(){return t.targets===void 0?e:Ga(e,t.targets,n)})}function to(e={}){let t=`patch-block`,n=/^[a-z0-9][a-z0-9_.-]{0,63}$/,r=/^#[0-9a-f]{6}$/i,{controls:i,presets:a,triggers:o,onSet:s,onPreset:c,onTrigger:l,onVisible:u}=e,d=i&&new Map(i.map(e=>[e.id,e])),f=a&&new Map(a.map(e=>[e.id,e.values])),p=o&&new Set(o.map(e=>e.id)),m=window.parent,h=m&&m!==window,g=`*`,_=!1,v=!0,y=!1,b=null,x={};for(let e of i??[]){let t={number:e.min,choice:e.options?.[0]?.value,toggle:!1};x[e.id]=e.default??t[e.type]??`#ffffff`}let S=(e,t)=>{let i=d?.get(e);if(!i)return d||typeof e!=`string`||!n.test(e)?void 0:typeof t==`string`||typeof t==`boolean`||Number.isFinite(t)?t:void 0;switch(i.type){case`number`:return Number.isFinite(t)&&!(t<i.min)&&!(t>i.max)?t:void 0;case`choice`:return i.options?.some(e=>e.value===t)?t:void 0;case`toggle`:return typeof t==`boolean`?t:void 0;case`color`:return typeof t==`string`&&r.test(t)?t.toLowerCase():void 0}},C=e=>{let t={};for(let[n,r]of Object.entries(e??{})){let e=S(n,r);e!==void 0&&(x[n]=e,t[n]=e)}return t},w=(e,...t)=>{try{e?.(...t)}catch(e){console.error(e)}},T=(e,n)=>{h&&m.postMessage({channel:t,type:e,...n},g)},E=()=>T(`state`,{values:{...x}}),D=0,O=-1,k=0,ee=0,A=0,te=e=>Math.round(e*10)/10,j=e=>{D=window.requestAnimationFrame(j),O<0?k=e:(ee+=1,A=Math.max(A,e-O)),O=e,e-k<1e3||(T(`stats`,{fps:te(ee*1e3/(e-k)),ms:te(A)}),k=e,ee=0,A=0)},ne=()=>{D&&window.cancelAnimationFrame(D),D=0,h&&_&&v&&(O=-1,ee=0,A=0,D=window.requestAnimationFrame(j))};return window.addEventListener(`message`,e=>{let r=e.data;if(!h||e.source!==m||r?.channel!==t||g!==`*`&&e.origin!==g)return;let{type:i,id:a}=r;if(i===`hello`)e.origin!==`null`&&(g=e.origin),_?(T(`ready`),E()):b&&=(T(`progress`,b),null);else if(i===`visible`){if(typeof r.visible!=`boolean`||r.visible===v)return;v=r.visible,w(u,v),ne()}else if(!_)return;else if(i===`set`){let e=S(a,r.value);if(e===void 0)return;x[a]=e,w(s,a,e)}else if(i===`preset`){if(typeof a!=`string`||!n.test(a)||(f?!f.has(a):!c))return;y=!0;try{let e=C(f?.get(a));if(c)w(c,a,e);else for(let[t,n]of Object.entries(e))w(s,t,n)}finally{y=!1}E()}else i===`trigger`&&typeof a==`string`&&(p?p.has(a):n.test(a))&&w(l,a)}),{progress(e,t){_||!Number.isFinite(e)||e<0||e>1||(b=typeof t==`string`?{value:e,label:t}:{value:e},T(`progress`,b))},ready(){_=!0,T(`ready`),E(),D||ne()},state(e){C(e),_&&!y&&E()},get values(){return{...x}},get visible(){return v}}}var no={controls:[{id:`view`,label:`시점`,hint:`차 뒤에서 보거나 운전석에서 봅니다. 주행 중 V로 바꿉니다.`,type:`choice`,options:[{value:`chase`,label:`추적`},{value:`driver`,label:`운전석`}],default:`chase`,essential:!0},{id:`map`,label:`맵`,hint:`숲을 도는 랠리 스테이지 또는 낡은 야드.`,type:`choice`,options:[{value:`stage`,label:`스테이지`},{value:`yard`,label:`야드`}],default:`stage`,essential:!0},{id:`assists`,label:`주행 보조`,hint:`ABS, 트랙션 컨트롤, 스티어링 보조. 끄면 조향과 브레이크가 그대로 잠깁니다.`,type:`toggle`,default:!0,essential:!0},{id:`grip`,label:`그립`,hint:`모든 노면에서 타이어가 버티는 정도. 1이 실제 타이어입니다.`,type:`number`,min:.4,max:1.35,step:.05,default:1,essential:!0},{id:`stiffness`,label:`서스펜션`,hint:`스프링 강성. 낮으면 차체가 기울고 앞이 파묻히고, 높으면 평평하게 유지됩니다.`,type:`number`,min:.6,max:2.2,step:.05,default:1},{id:`slow`,label:`슬로우 모션`,hint:`차를 포함해 세상 전체가 느려집니다. 0은 정상 속도, 0.9는 1/10 속도입니다.`,type:`number`,min:0,max:.9,step:.05,default:0},{id:`power`,label:`출력`,hint:`엔진 출력을 원래 차 대비 비율로 정합니다.`,type:`number`,min:.4,max:2.5,step:.05,default:1},{id:`drive`,label:`앞바퀴 구동`,hint:`앞바퀴로 가는 구동력: 0은 후륜 구동, 1은 전륜 구동. 0 미만이면 원래 차 설정입니다.`,type:`number`,min:-.05,max:1,step:.05,default:-.05},{id:`lock`,label:`조향각`,hint:`앞바퀴가 꺾이는 최대 각도를 원래 차 대비 비율로 정합니다.`,type:`number`,min:.5,max:1.4,step:.05,default:1},{id:`flip_wait`,label:`전복 후 복구 시간`,hint:`지붕이나 옆면으로 뒤집힌 뒤 스스로 일어날 때까지의 시간입니다.`,type:`number`,min:.5,max:10,step:.5,default:3,unit:`초`}],presets:[],triggers:[{id:`reset`,label:`리셋`,hint:`처음으로: 모든 설정, 차, 상자, 마네킹, 시점이 돌아갑니다.`}]},ro=60/(2*Math.PI),io={tarmac:{mu:1.2,alpha:.13,kappa:.11,falloff:.82,scrub:.3,rolling:.012,rough:.001},gravel:{mu:.86,alpha:.24,kappa:.2,falloff:.9,scrub:.4,rolling:.03,rough:.016},grass:{mu:.66,alpha:.28,kappa:.24,falloff:.85,scrub:.45,rolling:.05,rough:.024}},ao={mass:1200,comHeight:.52,frontWeight:.52,travel:.26,rest:.55,hertz:[1.9,1.75],damping:[.42,.42],bump:.7,rebound:1.35,antiRoll:[.45,.25],tyreGive:.025,gripScale:1,loadSensitivity:.13,relaxation:.35,wheelInertia:1.1,lock:.6,steerRate:3.6,torque:340,torqueCurve:[[1e3,.62],[2500,.86],[4500,1],[6e3,.97],[7200,.74]],idle:1100,redline:7200,launch:3400,engineInertia:.16,engineBrake:.018,gears:[3.42,2.26,1.68,1.29,1.03],reverse:3.3,finalDrive:3.9,shiftTime:.16,efficiency:.9,frontDrive:.4,limitedSlip:900,diffLimit:500,brakeTorque:2900,brakeFront:.62,handbrakeTorque:3200,handbrakeDrag:.3,coastBrake:.08,coastSpeed:5,dragArea:.72,assists:!0},oo=(e,t,n,r)=>{let i=2*(e.y*r-e.z*n),a=2*(e.z*t-e.x*r),o=2*(e.x*n-e.y*t);return{x:t+e.w*i+e.y*o-e.z*a,y:n+e.w*a+e.z*i-e.x*o,z:r+e.w*o+e.x*a-e.y*i}},so=(e,t)=>e.x*t.x+e.y*t.y+e.z*t.z,co=(e,t,n)=>Math.min(n,Math.max(t,e));function lo(e,t){let n=Math.floor(e),r=Math.floor(t),i=e-n,a=t-r,o=(e,t)=>{let n=Math.sin(e*127.1+t*311.7)*43758.5453;return(n-Math.floor(n))*2-1},s=i*i*(3-2*i),c=a*a*(3-2*a);return(o(n,r)*(1-s)+o(n+1,r)*s)*(1-c)+(o(n,r+1)*(1-s)+o(n+1,r+1)*s)*c}var uo=(e,t)=>lo(e/6,t/6)*.75+lo(e/2.4+40,t/2.4)*.25;function fo(e,t){let n=(Math.PI-Math.asin(t))/(Math.PI/2),r=Math.tan(Math.PI/(2*n));return Math.sin(n*Math.atan(r*e))}var po=class{constructor(e,t,n){this.RAPIER=e,this.world=t;let{wheels:r,size:i,position:a={x:0,y:.5,z:0},yaw:o=0,groups:s={},surfaceAt:c=null,...l}=n;this.tune={...ao,...l},this.size=i,this.surfaceAt=c,this.input={throttle:0,steer:0,brake:0,handbrake:0},this.listeners=new Map,this.spawn={position:{...a},yaw:o},this.position={...a},this.quaternion={x:0,y:Math.sin(o/2),z:0,w:Math.cos(o/2)},this.forward=oo(this.quaternion,0,0,1),this.up={x:0,y:1,z:0},this.side=oo(this.quaternion,1,0,0),this.velocity={x:0,y:0,z:0},this.speed=0,this.forwardSpeed=0,this.sideSpeed=0,this.yawRate=0,this.steer=0,this.gear=1,this.rpm=this.tune.idle,this.shifting=0,this.sinceShift=1,this.throttleOut=0,this.tractionCut=0,this.wheelsOnGround=0,this.airborne=!1,this.upsideDown={active:!1,wait:0},this.flips=0,this.flipWait=3,this.righting=0,this.stuckFor=0,this.makeBody(a,o,s,r);let u=i.height*.5;this.wheels=r.map((e,t)=>{let n=e.front??e.z>0;return{...e,index:t,front:n,left:e.x>0,ride:u-e.y,rayStart:u,steerAngle:0,spin:0,angle:0,inContact:!1,contactY:0,contact:{x:0,y:0,z:0},normal:{x:0,y:1,z:0},length:0,compression:0,lastCompression:0,travelled:.5,load:0,slipAngle:0,slipRatio:0,slip:0,surface:`tarmac`,rough:0,dampSpeed:0,fx:0,fy:0,braking:0}}),this.computeSprings(),this.rayFlags=e.QueryFilterFlags.EXCLUDE_DYNAMIC|e.QueryFilterFlags.EXCLUDE_SENSORS}makeBody(e,t,n,r){let i=this.RAPIER,a=this.tune,{width:o,height:s,length:c}=this.size;this.body=this.world.createRigidBody(i.RigidBodyDesc.dynamic().setTranslation(e.x,e.y,e.z).setRotation({x:0,y:Math.sin(t/2),z:0,w:Math.cos(t/2)}).setCanSleep(!1).setCcdEnabled(!0).setLinearDamping(0).setAngularDamping(.05));let l=a.mass,u=l*(s*s+c*c)/12,d=l*(o*o+c*c)/12,f=l*(o*o+s*s)/12,p=r.filter(e=>e.front??e.z>0)[0].z,m=r.filter(e=>!(e.front??e.z>0))[0].z,h=m+a.frontWeight*(p-m),g=(e,t,n,r,o,s,c,p=.35)=>{let m=i.ColliderDesc.cuboid(e,t,n).setTranslation(0,r,o).setFriction(p).setRestitution(.1);return m=s?m.setMassProperties(l,{x:0,y:a.comHeight-r,z:h-o},{x:u*.8,y:d*.85,z:f*.75},{x:0,y:0,z:0,w:1}):m.setMass(0),c!==void 0&&(m=m.setCollisionGroups(c)),m=m.setActiveEvents(i.ActiveEvents.CONTACT_FORCE_EVENTS).setContactForceEventThreshold(l*8),this.world.createCollider(m,this.body)},_=.3*s,v=.68*s;g(.47*o,(v-_)/2,.48*c,(v+_)/2,0,!0,n.body),g(.4*o,(s-v)*.9/2,.22*c,v+(s-v)*.9/2,-.04*c,!1,n.body),n.bumper!==void 0&&g(.5*o,.3*s,.505*c,.42*s,0,!1,n.bumper)}computeSprings(){let e=this.tune,t=Math.abs(this.world.gravity.y);for(let n of this.wheels){let r=+!n.front,i=(n.front?e.frontWeight:1-e.frontWeight)/2,a=e.mass*i;n.sprung=a;let o=2*Math.PI*e.hertz[r];n.k=a*o*o,n.c=2*e.damping[r]*a*o,n.arb=n.k*e.antiRoll[r],n.sag=a*t/n.k;let s=e.travel*(1-e.rest);n.maxLength=n.ride+s,n.minLength=Math.max(.02,n.ride-e.travel*e.rest),n.length=n.ride,n.opposite=this.wheels.find(e=>e.front===n.front&&e.left!==n.left),n.inertia=e.wheelInertia,n.brakeMax=e.brakeTorque*(n.front?e.brakeFront:1-e.brakeFront)/2}this.driven={front:this.wheels.filter(e=>e.front),rear:this.wheels.filter(e=>!e.front)},this.driveWheelCount=(e.frontDrive>0?2:0)+(e.frontDrive<1?2:0),this.driveRadius=this.wheels.reduce((e,t)=>e+t.radius,0)/this.wheels.length,this.wheelbase=Math.abs(this.driven.front[0].z-this.driven.rear[0].z)}applyTune(){this.computeSprings()}on(e,t){return this.listeners.has(e)||this.listeners.set(e,[]),this.listeners.get(e).push(t),this}emit(e,...t){for(let n of this.listeners.get(e)??[])n(...t)}torqueAt(e){let t=this.tune.torqueCurve;if(e<=t[0][0])return t[0][1]*this.tune.torque;for(let n=1;n<t.length;n++)if(e<=t[n][0]){let r=t[n-1],i=t[n];return(r[1]+(i[1]-r[1])*(e-r[0])/(i[0]-r[0]))*this.tune.torque}return t[t.length-1][1]*this.tune.torque}ratio(){let e=this.tune;return this.gear<0?-e.reverse*e.finalDrive:e.gears[this.gear-1]*e.finalDrive}update(e){this.readBody(),this.updateSteering(e),this.updateGearbox(e),this.readRoad(),this.applySuspension(e),this.solveTyres(e),this.applyAir(e)}readBody(){let e=this.body,t=e.rotation();this.quaternion={x:t.x,y:t.y,z:t.z,w:t.w},this.forward=oo(t,0,0,1),this.up=oo(t,0,1,0),this.side=oo(t,1,0,0);let n=e.linvel();this.velocity={x:n.x,y:n.y,z:n.z},this.speed=Math.hypot(n.x,n.y,n.z),this.forwardSpeed=so(n,this.forward),this.sideSpeed=so(n,this.side);let r=e.angvel();this.angular={x:r.x,y:r.y,z:r.z},this.yawRate=so(r,this.up);let i=e.translation();this.position={x:i.x,y:i.y,z:i.z},this.com=e.worldCom()}updateSteering(e){let t=this.tune,n=co(this.input.steer,-1,1),r=n===0||Math.sign(n)!==Math.sign(this.steer)?t.steerRate*1.7:t.steerRate;this.steer+=co(n-this.steer,-r*e,r*e);let i=t.lock,a=Math.abs(this.forwardSpeed),o=0;if(t.assists&&a>2&&!this.input.handbrake){let e=io[this.wheels[0].surface],n=e.mu*t.gripScale*9.81,r=Math.atan(this.wheelbase*n/(a*a));i=Math.min(t.lock,r+e.alpha*.95),this.forwardSpeed>2&&!this.airborne&&(o=co(Math.atan2(this.sideSpeed,Math.abs(this.forwardSpeed))*.65*(1-Math.abs(this.steer)*.6),-t.lock*.7,t.lock*.7))}let s=co(this.steer*i+o,-t.lock,t.lock);for(let e of this.wheels)e.front&&(e.steerAngle=s*(s>0===e.left?1.06:.94))}updateGearbox(e){let t=this.tune;if(this.sinceShift+=e,this.shifting>0&&(this.shifting-=e,this.shifting<=0&&this.nextGear!==void 0&&(this.gear=this.nextGear,this.nextGear=void 0,this.sinceShift=0)),this.reverseRequest&&Math.abs(this.forwardSpeed)<1.2&&this.gear>0&&(this.gear=-1),this.forwardRequest&&Math.abs(this.forwardSpeed)<1.2&&this.gear<0&&(this.gear=1),this.gear<0||this.shifting>0)return;let n=Math.abs(this.forwardSpeed)/this.driveRadius,r=n*this.ratio()*ro;if(this.sinceShift>.35){if(r>t.redline*.96&&this.gear<t.gears.length)this.shift(this.gear+1);else if(this.gear>1){let e=n*t.gears[this.gear-2]*t.finalDrive*ro,r=this.input.throttle>.5?.82:.62;e<t.redline*r&&this.shift(this.gear-1)}}}shift(e){this.shifting>0||(this.nextGear=e,this.shifting=this.tune.shiftTime,this.emit(`shift`,e))}readRoad(){let e=this.RAPIER,t=0;for(let n of this.wheels){let r=oo(this.quaternion,n.x,n.rayStart,n.z),i={x:this.position.x+r.x,y:this.position.y+r.y,z:this.position.z+r.z},a={x:-this.up.x,y:-this.up.y,z:-this.up.z};n.origin=i;let o=n.maxLength+n.radius,s=this.up.y>.05?this.world.castRayAndGetNormal(new e.Ray(i,a),o,!0,this.rayFlags,void 0,void 0,this.body):null;if(s&&s.timeOfImpact>1e-4){let e=s.timeOfImpact;n.inContact=!0,n.contact={x:i.x+a.x*e,y:i.y+a.y*e,z:i.z+a.z*e},n.normal=s.normal,n.contactY=n.contact.y;let r=this.surfaceAt?this.surfaceAt(n.contact.x,n.contact.z,s.collider):`tarmac`;n.surface=io[r]?r:`tarmac`,n.rough+=(io[n.surface].rough-n.rough)*.04;let o=e-n.radius-n.rough*uo(n.contact.x,n.contact.z);n.length=Math.max(n.minLength,o),n.bottomed=o<n.minLength,n.bottomDepth=n.bottomed?n.minLength-o:0,t++}else n.inContact=!1,n.length=n.maxLength,n.bottomed=!1,n.bottomDepth=0;n.compression=n.ride+n.sag-n.length,n.travelled=(n.maxLength-n.length)/this.tune.travel}this.airborne&&t>=3&&this.emit(`land`,Math.abs(this.velocity.y)),t===0?(this.airborne||this.emit(`takeoff`),this.airborne=!0):t>=3&&(this.airborne=!1),this.wheelsOnGround=t}applySuspension(e){let t=this.tune;for(let n of this.wheels){let r=(n.compression-n.lastCompression)/e;if(n.lastCompression=n.compression,n.load=0,!n.inContact)continue;let i=r>0?t.bump:t.rebound;n.dampSpeed+=(r-n.dampSpeed)*(1-Math.exp(-e/t.tyreGive));let a=n.k*n.compression+n.c*i*co(n.dampSpeed,-2.5,2.5);if(a+=n.arb*(n.compression-n.opposite.compression),n.bottomed&&(a+=r>0?n.k*5*n.bottomDepth+n.c*2.5*r:n.k*.5*n.bottomDepth),a=co(a,0,n.sprung*9.81*7),so(n.normal,this.up)<.2)continue;n.load=a;let o=a*e;this.body.applyImpulseAtPoint({x:n.normal.x*o,y:n.normal.y*o,z:n.normal.z*o},n.contact,!0)}}solveTyres(e){let t=this.tune,n=this.input,r=this.body.linvel(),i=this.body.angvel(),a=this.com,o=this.forwardSpeed<-.5;this.forwardRequest=n.throttle>0,this.reverseRequest=n.brake>0&&!(n.throttle>0);let s=0,c=0;this.gear>0?(s=n.throttle,c=n.brake):(s=n.brake,c=n.throttle),o&&this.gear>0&&n.throttle>0&&(c=Math.max(c,n.throttle)),this.shifting>0&&(s=0),!n.throttle&&!n.brake&&Math.abs(this.forwardSpeed)<.6&&(c=Math.max(c,.25)),!n.throttle&&!n.brake&&(Math.abs(this.forwardSpeed)<t.coastSpeed||this.forwardSpeed*this.gear<-.5)&&(c=Math.max(c,t.coastBrake)),n.handbrake>0&&(c=Math.max(c,t.handbrakeDrag));for(let n of this.wheels){if(n.fx=0,n.fy=0,n.vx=0,n.vz=0,!n.inContact||n.load<=0)continue;let o=n.contact.x-a.x,s=n.contact.y-a.y,c=n.contact.z-a.z,l=r.x+(i.y*c-i.z*s),u=r.y+(i.z*o-i.x*c),d=r.z+(i.x*s-i.y*o),f=Math.sin(n.steerAngle),p=Math.cos(n.steerAngle),m=this.forward.x*p+this.side.x*f,h=this.forward.y*p+this.side.y*f,g=this.forward.z*p+this.side.z*f,_=n.normal,v=m*_.x+h*_.y+g*_.z;m-=_.x*v,h-=_.y*v,g-=_.z*v;let y=Math.hypot(m,h,g)||1;m/=y,h/=y,g/=y;let b=_.y*g-_.z*h,x=_.z*m-_.x*g,S=_.x*h-_.y*m;n.axisF={x:m,y:h,z:g},n.axisL={x:b,y:x,z:S},n.vz=l*m+u*h+d*g,n.vx=l*b+u*x+d*S;let C=Math.abs(n.vz)+Math.abs(n.vx)*.25,w=Math.atan2(n.vx,Math.max(Math.abs(n.vz),1.2)),T=1-Math.exp(-(C+2)*e/t.relaxation);n.slipAngle+=(w-n.slipAngle)*T}let l=this.ratio(),u=this.shifting<=0,d=this.wheels.filter(e=>e.front?t.frontDrive>0:t.frontDrive<1),f=d.reduce((e,t)=>e+t.spin,0)/d.length,p=Math.abs(f*l)*ro,m=t.idle+(t.launch-t.idle)*s,h=Math.max(p,m);u||(h=Math.max(t.idle,this.rpm+(p-this.rpm)*Math.min(1,e*14)));let g=h>t.redline*1.02;if(this.rpm+=(Math.min(h,t.redline*1.03)-this.rpm)*Math.min(1,e*18),this.rpm=Math.max(t.idle,this.rpm),t.assists){let t=0;for(let e of d)e.inContact&&(t=Math.max(t,e.front?Math.abs(e.slipRatio)/io[e.surface].kappa:e.slip));let n=co((t-1.25)/1.4,0,1);this.tractionCut+=(n-this.tractionCut)*Math.min(1,e*(n>this.tractionCut?30:7))}else this.tractionCut=0;let _=s*(1-this.tractionCut*.92);this.throttleOut=_;let v=g?0:this.torqueAt(this.rpm)*_,y=Math.sign(l),b=f*y>0,x=u&&b&&p>t.idle*1.1?t.engineBrake*this.rpm*(1-_):0,S=u?(v-x)*Math.abs(l)*t.efficiency*y:0,C=n.handbrake>0;C&&t.frontDrive===0&&(S=0);let w=C?+(t.frontDrive>0):t.frontDrive,T=u?t.engineInertia*l*l/Math.max(1,this.driveWheelCount):0,E=e/14;for(let e of this.wheels)e.avgX=0,e.avgY=0;for(let e=0;e<14;e++)for(let e of[this.driven.front,this.driven.rear]){let n=e===this.driven.front?w:1-w,r=S*n,[i,a]=e,o=n>0?co((i.spin-a.spin)*t.limitedSlip,-t.diffLimit,t.diffLimit):0;for(let t of e){let e=t===i?-o:o;this.stepWheel(t,r/2+e*.5,c,C&&!t.front,n>0?T:0,E)}}for(let t of this.wheels){if(!t.inContact||t.load<=0){t.fx=0,t.fy=0;continue}t.fx=t.avgX/14,t.fy=t.avgY/14;let n=t.sprung*Math.abs(t.vx)/e;Math.abs(t.fx)>n&&(t.fx=Math.sign(t.fx)*n);let r=io[t.surface].rolling*t.load*Math.tanh(t.vz),i=t.fy-r,a=(t.axisL.x*t.fx+t.axisF.x*i)*e,o=(t.axisL.y*t.fx+t.axisF.y*i)*e,s=(t.axisL.z*t.fx+t.axisF.z*i)*e;this.body.applyImpulseAtPoint({x:a,y:o,z:s},t.contact,!0)}}stepWheel(e,t,n,r,i,a){let o=this.tune,s=e.inertia+i,c=0,l=0;if(e.inContact&&e.load>0){let t=io[e.surface],n=e.vz,r=e.spin*e.radius,i=Math.max(Math.abs(n),Math.abs(r)*.5,4.5),a=co((r-n)/i,-1.2,1.2);e.slipRatio=a;let s=a/t.kappa,u=Math.tan(e.slipAngle)/Math.tan(t.alpha),d=Math.hypot(s,u);e.slip=d;let f=e.sprung*9.81,p=t.mu*o.gripScale*(1-o.loadSensitivity*(e.load/f-1)),m=Math.max(.2*t.mu,p)*e.load*fo(d,t.falloff);d>1e-5&&(c=m*s/d,l=-m*u*(1+t.scrub*co((Math.abs(u)-1)/2,0,1))/d)}else e.slip=0,e.slipRatio=0;let u=n*e.brakeMax;if(o.assists&&n>0&&e.inContact&&!r){let t=(Math.abs(e.slipRatio)-io[e.surface].kappa)/io[e.surface].kappa;e.slipRatio<0&&t>0&&(u*=Math.max(.15,1-t*1.6))}r&&(u+=o.handbrakeTorque/2),e.braking=u;let d=t-c*e.radius,f=e.spin+d/s*a,p=u/s*a;Math.abs(f)<=p?f=0:f-=Math.sign(f)*p,e.spin=f,e.inContact||(e.spin*=1-.3*a),e.avgY+=c,e.avgX+=l}applyAir(e){let t=this.velocity,n=.6125*this.tune.dragArea*this.speed;this.body.applyImpulse({x:-t.x*n*e,y:-t.y*n*e,z:-t.z*n*e},!0)}afterStep(e){this.readBody();for(let t of this.wheels)t.angle+=t.spin*e;let t=this.upsideDown,n=this.up.y<.4&&this.speed<6;n!==t.active&&(t.active=n,t.wait=0,this.emit(n?`upsideDown`:`rightSideUp`)),this.righting>0?this.guideRighting(e):t.active&&(t.wait+=e,t.wait>=this.flipWait&&(t.wait=0,this.flip())),Math.abs(this.input.throttle)+Math.abs(this.input.brake)>.5&&this.speed<.6?(this.stuckFor+=e,this.stuckFor>3&&(this.stuckFor=0,this.emit(`stuck`))):this.stuckFor=0}flip(){let e=this.body.linvel();this.body.setLinvel({x:e.x*.5,y:6.5,z:e.z*.5},!0),this.righting=1.5,this.flips++,this.emit(`flip`)}guideRighting(e){this.righting-=e;let t=this.up,n=Math.acos(co(t.y,-1,1)),r=-t.z,i=t.x,a=Math.hypot(r,i);a<.001?(r=this.forward.x,i=this.forward.z):(r/=a,i/=a);let o=Math.min(4.5,n*5);this.body.setAngvel({x:r*o,y:0,z:i*o},!0),(this.righting<=0||n<.03&&this.wheelsOnGround>0)&&(this.righting=0)}moveTo(e=this.spawn.position,t=this.spawn.yaw){let n={x:0,y:Math.sin(t/2),z:0,w:Math.cos(t/2)};this.body.setTranslation(e,!0),this.body.setRotation(n,!0),this.body.setLinvel({x:0,y:0,z:0},!0),this.body.setAngvel({x:0,y:0,z:0},!0),this.readBody(),this.airborne=!1,this.stuckFor=0,this.righting=0,this.upsideDown.active=!1,this.upsideDown.wait=0,this.gear=1,this.shifting=0,this.nextGear=void 0,this.rpm=this.tune.idle,this.steer=0,this.tractionCut=0;for(let e of this.wheels)e.spin=0,e.angle=0,e.slipAngle=0,e.slipRatio=0,e.slip=0,e.lastCompression=e.compression}dispose(){this.world.removeRigidBody(this.body)}},mo={fl:`part_wheel_fl`,fr:`part_wheel_fr`,rl:`part_wheel_rl`,rr:`part_wheel_rr`},ho=new Pe,go=new G,_o=new G,vo=new Ft,yo=new Ft,bo=new G,xo=new G(0,0,1);function So(e,t=mo){e.updateMatrixWorld(!0);let n=[];for(let[r,i]of Object.entries(t)){let t=e.getObjectByName(i);if(!t)throw Error(`measureCar: no wheel called ${i} in this model`);ho.setFromObject(t).getCenter(_o),ho.getSize(go),n.push({key:r,name:i,x:_o.x,y:_o.y,z:_o.z,radius:go.y/2,front:r[0]===`f`})}let r=new Set(n.map(e=>e.name)),i=new Pe;return e.traverse(e=>{if(e.isMesh){for(let t=e;t;t=t.parent)if(r.has(t.name))return;i.expandByObject(e)}}),i.getSize(go),{size:{width:go.x,height:i.max.y,length:go.z},wheels:n}}function Co(e){let t=e.clone();for(let[e,n]of Object.entries(t.attributes)){let{count:r,itemSize:i}=n,a=new Float32Array(r*i);for(let e=0;e<r;e++)for(let t=0;t<i;t++)a[e*i+t]=n.getComponent(e,t);t.setAttribute(e,new K(a,i))}return t}function wo(e,t){e.updateMatrixWorld(!0);let n=new Tt().copy(e.matrixWorld).invert(),r=new Map,i=n=>{if(!(n!==e&&t(n))){n.isMesh&&(r.has(n.material)||r.set(n.material,[]),r.get(n.material).push(n));for(let e of n.children)i(e)}};i(e);let a=[];for(let[e,t]of r){let r=t.map(e=>{let t=Co(e.geometry),r=new Tt().multiplyMatrices(n,e.matrixWorld);if(t.applyMatrix4(r),r.determinant()<0&&t.index){let e=t.index.array;for(let t=0;t<e.length;t+=3){let n=e[t+1];e[t+1]=e[t+2],e[t+2]=n}}return t.index?t:t.toNonIndexed()}),i=Object.keys(r[0].attributes).filter(e=>r.every(t=>t.attributes[e])),o=r.map(e=>{let t=new ze;t.setIndex(e.index);for(let n of i)t.setAttribute(n,e.attributes[n]);return t}),s=new Mt(V(o,!1),e);s.castShadow=!0,s.receiveShadow=!0,a.push(s)}return a}var To={rpm:`part_needle_rpm`,speed:`part_needle_speed`,clutch:`part_pedal_clutch`,brake:`part_pedal_brake`,throttle:`part_pedal_throttle`,handbrake:`part_handbrake`,gear:`part_gear_lever`},Eo=.12,Do=new G(1,0,0),Oo=new G(0,0,1);function ko(e,t=`model`){let n=new G().setFromMatrixPosition(e.matrixWorld),r=new pe;r.position.copy(n);let i=new pe;return r.add(i),t===`model`&&i.position.copy(n).negate(),{group:r,inner:i,at:n}}var Ao=class{constructor(e,t,{names:n=mo,steerNames:r={fl:`part_steer_fl`,fr:`part_steer_fr`,rl:`part_steer_rl`,rr:`part_steer_rr`},bump:i=.13,droop:a=.2,wheelTurn:o=5,wheelAxis:s=null,cabin:c=null,cabinGlow:l=0}={}){this.car=t,this.object=new pe,this.object.name=`car`,this.bump=i,this.droop=a,this.wheelTurn=o,e.updateMatrixWorld(!0);let u=new Set([...Object.values(n),...Object.values(r)]);for(let e of Object.keys(n))for(let t of[`part_lca_`,`part_uca_`,`part_spring_`])u.add(t+e);u.add(`part_steering_wheel`);for(let e of Object.values(To))u.add(e);let d=new Map;for(let i of t.wheels){let t=e.getObjectByName(n[i.key]),a=r[i.key]?e.getObjectByName(r[i.key]):null,o=new pe;o.position.set(i.x,i.y,i.z);let s=new pe;o.add(s);let c=new pe;c.position.set(-i.x,-i.y,-i.z),s.add(c);for(let e of wo(t,()=>!1))e.applyMatrix4(t.matrixWorld),c.add(e);if(a){let e=new pe;e.position.set(-i.x,-i.y,-i.z),o.add(e);for(let n of wo(a,e=>e===t))n.applyMatrix4(a.matrixWorld),e.add(n)}this.object.add(o);let l={holder:o,spin:s,y:0,arms:[],spring:null};for(let t of[`part_lca_${i.key}`,`part_uca_${i.key}`]){let n=e.getObjectByName(t);if(!n)continue;let{group:r,inner:a,at:o}=ko(n);for(let e of wo(n,()=>!1))e.applyMatrix4(n.matrixWorld),e.castShadow=!1,a.add(e);this.object.add(r);let s={group:r,at:o,reach:i.x-o.x};l.arms.push(s);let c=n.getObjectByName(`mount_spring_${i.key}`);c&&(s.mount=new G().setFromMatrixPosition(c.matrixWorld).sub(o),l.lower=s)}let u=e.getObjectByName(`part_spring_${i.key}`);if(u&&l.lower){let{group:e,inner:t,at:n}=ko(u,`own`);for(let e of wo(u,()=>!1))e.castShadow=!1,t.add(e);this.object.add(e);let r=l.lower.mount.clone().add(l.lower.at).sub(n);u.getWorldQuaternion(e.quaternion),l.spring={group:e,at:n,length:r.length(),restDir:r.clone().normalize(),restQ:e.quaternion.clone()}}d.set(i.key,l)}for(let t of wo(e,e=>u.has(e.name)))this.object.add(t);this.eye=e.getObjectByName(`eye_driver`)?.getWorldPosition(new G)??null;let f=e.getObjectByName(`part_steering_wheel`);if(f){let{group:e,inner:t}=ko(f,`own`);for(let e of wo(f,()=>!1))t.add(e);f.getWorldQuaternion(e.quaternion),this.object.add(e);let n=null,r=0;for(let t of[new G(1,0,0),new G(0,1,0),new G(0,0,1)]){let i=t.clone().applyQuaternion(e.quaternion).z;Math.abs(i)>r&&(r=Math.abs(i),n=t.multiplyScalar(-Math.sign(i)))}this.steeringWheel={group:e,restQ:e.quaternion.clone(),axis:s?new G(s.x,s.y,s.z):n}}this.cabin=c,this.parts={};for(let[t,n]of Object.entries(To)){let r=e.getObjectByName(n);if(!r)continue;let{group:i,inner:a}=ko(r,`own`);for(let e of wo(r,()=>!1))e.castShadow=!1,a.add(e);r.getWorldQuaternion(i.quaternion),this.object.add(i),this.parts[t]={group:i,restQ:i.quaternion.clone(),amount:0}}this.glass=new Set,this.object.traverse(e=>{e.isMesh&&e.material.name===`glass`&&this.glass.add(e.material)});for(let e of this.glass)e.userData.outside=e.opacity;this.object.traverse(e=>{l&&e.isMesh&&e.material.name===`trim`&&e.material.map&&!this.trim&&(this.trim=e.material,this.trim.emissive.set(`#ffffff`),this.trim.emissiveMap=this.trim.map,this.trim.emissiveIntensity=0)}),this.cabinGlow=l,this.shiftRock=0,this.lastGear=1,this.showInside(!1),this.object.traverse(e=>{e.isMesh&&e.material.name===`brake_light`&&(this.brakeLight=e.material)}),this.brakeLight&&(this.brakeLight.emissive.set(`#ff1608`),this.brakeLight.emissiveIntensity=0),this.nodes=d,this.prev={position:t.position,quaternion:t.quaternion},this.cur={position:t.position,quaternion:t.quaternion}}attach(e){this.car=e;for(let e of this.nodes.values())e.y=0;this.snap()}stepped(){this.prev.position=this.cur.position,this.prev.quaternion=this.cur.quaternion,this.cur.position=this.car.position,this.cur.quaternion=this.car.quaternion}snap(){this.prev.position=this.cur.position=this.car.position,this.prev.quaternion=this.cur.quaternion=this.car.quaternion,this.update(1,1)}update(e,t=1){let{prev:n,cur:r,car:i,object:a}=this,o=n.position,s=r.position;a.position.set(o.x+(s.x-o.x)*t,o.y+(s.y-o.y)*t,o.z+(s.z-o.z)*t);let c=n.quaternion,l=r.quaternion;a.quaternion.set(c.x,c.y,c.z,c.w).slerp(vo.set(l.x,l.y,l.z,l.w),t);for(let t of i.wheels){let n=this.nodes.get(t.key),r=Math.min(this.bump,Math.max(-this.droop,t.ride-t.length));n.y+=(r-n.y)*Math.min(1,e*40),n.holder.position.y=t.y+n.y,n.holder.rotation.y=t.front?t.steerAngle:0,n.spin.rotation.x=t.angle;for(let e of n.arms)e.group.rotation.z=e.reach?Math.atan(n.y/Math.abs(e.reach))*Math.sign(e.reach):0;if(n.spring){let e=n.lower;bo.copy(e.mount).applyAxisAngle(xo,e.group.rotation.z).add(e.at).sub(n.spring.at);let t=bo.length();yo.setFromUnitVectors(n.spring.restDir,bo.divideScalar(t)),n.spring.group.quaternion.copy(yo).multiply(n.spring.restQ),n.spring.group.scale.y=t/n.spring.length}}if(this.brakeLight){let t=i.input?.brake>0&&i.gear>0||i.input?.throttle>0&&i.gear<0?3.5:0;this.brakeLight.emissiveIntensity+=(t-this.brakeLight.emissiveIntensity)*Math.min(1,e*22)}if(this.steeringWheel){let e=i.wheels.filter(e=>e.front),t=e.reduce((e,t)=>e+t.steerAngle,0)/(e.length||1);this.steeringWheel.group.quaternion.copy(this.steeringWheel.restQ).multiply(yo.setFromAxisAngle(this.steeringWheel.axis,t*this.wheelTurn))}this.cabin&&this.updateCabin(e)}showInside(e){this.trim&&(this.trim.emissiveIntensity=e?this.cabinGlow:0);for(let t of this.glass)t.opacity=e?Math.min(t.userData.outside,Eo):t.userData.outside;for(let t of[`rpm`,`speed`,`clutch`,`brake`,`throttle`])this.parts[t]&&(this.parts[t].group.visible=e)}updateCabin(e){let{car:t,cabin:n,parts:r}=this,i=t.input??{},a=(e,t,n)=>{e&&e.group.quaternion.copy(e.restQ).multiply(yo.setFromAxisAngle(t,n))},o=(t,n,r)=>t?(t.amount+=(n-t.amount)*Math.min(1,e*r),t.amount):0;n.rpm&&a(r.rpm,Oo,n.rpm.sign*n.rpm.sweep*o(r.rpm,Math.min(1,t.rpm/n.rpm.full),14)),n.speed&&a(r.speed,Oo,n.speed.sign*n.speed.sweep*o(r.speed,Math.min(1,Math.abs(t.forwardSpeed)*3.6/n.speed.full),8));let s=t.gear<0?i.throttle:i.brake,c=t.gear<0?i.brake:i.throttle;n.throttle&&a(r.throttle,Do,n.throttle*o(r.throttle,c??0,16)),n.brake&&a(r.brake,Do,n.brake*o(r.brake,s??0,16)),n.clutch&&a(r.clutch,Do,n.clutch*o(r.clutch,+(t.shifting>0),18)),n.handbrake&&a(r.handbrake,Do,n.handbrake*o(r.handbrake,i.handbrake??0,18)),n.gear&&r.gear&&(t.gear!==this.lastGear&&(this.shiftRock=t.gear>this.lastGear?1:-1,this.lastGear=t.gear),this.shiftRock-=this.shiftRock*Math.min(1,e*7),a(r.gear,Do,n.gear*this.shiftRock))}},jo={label:`Vireo rally`,engine:`rally`,file:`models/vireo-rally.glb`,light:`models/vireo-rally-lod.glb`,size:{width:1.9,height:1.37,length:4.02},bodySize:{width:1.9,height:1.37,length:4.02},travelDrawn:{bump:.13,droop:.13},wheelTurn:8,cabinGlow:.16,wheelAxis:{x:0,y:1,z:0},cabin:{rpm:{full:9e3,sweep:4.712,sign:1},speed:{full:220,sweep:4.712,sign:1},throttle:-.35,brake:-.35,clutch:-.35,handbrake:-.35,gear:.25},wheels:[{key:`fl`,x:.785,y:.325,z:1.26,radius:.325,front:!0},{key:`fr`,x:-.785,y:.325,z:1.26,radius:.325,front:!0},{key:`rl`,x:.795,y:.325,z:-1.26,radius:.325,front:!1},{key:`rr`,x:-.795,y:.325,z:-1.26,radius:.325,front:!1}],tune:{mass:1100,comHeight:.5,frontWeight:.47,travel:.26,rest:.5,hertz:[1.4,1.35],damping:[.4,.4],antiRoll:[.26,.1],torque:450,frontDrive:.36,gears:[3.1,2.15,1.65,1.3,1.05],finalDrive:4.1,brakeTorque:4500,brakeFront:.58,handbrakeTorque:3300,lock:.56}},Mo=()=>({wheels:jo.wheels,size:jo.size,...jo.tune}),No=[`paint`,`wheel`];function Po(e,{dust:t=new q(.44,.37,.27),mud:n=new q(.13,.095,.065),value:r=0}={}){let i={value:r},a=new Set;return e.traverse(e=>{if(e.isMesh)for(let r of Array.isArray(e.material)?e.material:[e.material])!a.has(r)&&No.includes(r.name)&&r.metalnessMap&&(a.add(r),r.onBeforeCompile=e=>{e.uniforms.uDirt=i,e.uniforms.uDust={value:t},e.uniforms.uMud={value:n},e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform float uDirt;
uniform vec3 uDust;
uniform vec3 uMud;
float dirtCover = 0.0;`).replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
						{
							float dirtMask = texture2D(metalnessMap, vMetalnessMapUv).b;
							dirtCover = smoothstep(1.0 - uDirt, 1.32 - uDirt, dirtMask) * (uDirt > 0.0 ? 1.0 : 0.0);
							dirtCover *= mix(0.55, 1.0, clamp((dirtMask - 0.35) / 0.5, 0.0, 1.0));
							diffuseColor.rgb = mix(diffuseColor.rgb, mix(uDust, uMud, smoothstep(0.62, 0.92, dirtMask)), dirtCover);
							roughnessFactor = mix(roughnessFactor, 0.85, dirtCover);
						}`).replace(`#include <lights_physical_fragment>`,`#include <lights_physical_fragment>
						#ifdef USE_CLEARCOAT
							material.clearcoat *= 1.0 - dirtCover;
						#endif`)},r.customProgramCacheKey=()=>`car-dirt-${r.name}`,r.needsUpdate=!0)}),i}var Fo=class{constructor(e,t,n){this.length=n,this.position=new Float32Array(n*2*3),this.alpha=new Float32Array(n*2);let r=[];for(let e=0;e<n-1;e++){let t=e*2;r.push(t,t+1,t+2,t+1,t+3,t+2)}this.geometry=new ze,this.geometry.setAttribute(`position`,new K(this.position,3).setUsage(N)),this.geometry.setAttribute(`alpha`,new K(this.alpha,1).setUsage(N)),this.geometry.setIndex(r),this.mesh=new Mt(this.geometry,t),this.mesh.frustumCulled=!1,e.add(this.mesh),this.head=0,this.joined=!1,this.lastX=0,this.lastZ=0}add(e,t,n,r,i,a,o,s){if(!s){this.joined=!1;return}let c=Math.hypot(e-this.lastX,n-this.lastZ);if(this.joined&&c<.28)return;c>6&&(this.joined=!1),this.lastX=e,this.lastZ=n,this.joined||(this.head=(this.head+1)%this.length);let l=this.head,u=(l+1)%this.length,d=(u+1)%this.length,f=l*6;this.position[f]=e+r,this.position[f+1]=t+i,this.position[f+2]=n+a,this.position[f+3]=e-r,this.position[f+4]=t-i,this.position[f+5]=n-a;let p=this.joined?o:0;this.alpha[l*2]=this.alpha[l*2+1]=p,this.position.copyWithin(u*6,f,f+6),this.alpha[u*2]=this.alpha[u*2+1]=0,this.alpha[d*2]=this.alpha[d*2+1]=0,this.head=u,this.joined=!0,this.dirty=!0}flush(){this.dirty&&=(this.geometry.attributes.position.needsUpdate=!0,this.geometry.attributes.alpha.needsUpdate=!0,!1)}clear(){this.alpha.fill(0),this.position.fill(0),this.geometry.attributes.alpha.needsUpdate=!0,this.geometry.attributes.position.needsUpdate=!0,this.joined=!1,this.head=0}},Io=(e,t)=>{let n=new Oe({color:e,transparent:!0,depthWrite:!1,opacity:t,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});return n.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
attribute float alpha;
varying float vAlpha;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vAlpha = alpha;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying float vAlpha;`).replace(`#include <color_fragment>`,`#include <color_fragment>
diffuseColor.a *= vAlpha;`)},n.customProgramCacheKey=()=>`ribbon`,n},Lo={tarmac:{color:`#e8e4dc`,life:1.1,grow:3,rise:1.1,opacity:.3},gravel:{color:`#c7ae84`,life:1.2,grow:2.6,rise:.9,opacity:.55},grass:{color:`#7f7446`,life:.8,grow:2,rise:1.2,opacity:.7}},Ro=class{constructor(e){this.scene=e;let t=Io(`#17130f`,.62),n=Io(`#7d6746`,.42),r=Io(`#40331c`,.6),i=t=>[0,1,2,3].map(()=>new Fo(e,t,900));this.marks={tarmac:i(t),gravel:i(n),grass:i(r)};let a=document.createElement(`canvas`);a.width=a.height=64;let o=a.getContext(`2d`),s=o.createRadialGradient(32,32,2,32,32,32);s.addColorStop(0,`rgba(255,255,255,0.9)`),s.addColorStop(.5,`rgba(255,255,255,0.35)`),s.addColorStop(1,`rgba(255,255,255,0)`),o.fillStyle=s,o.fillRect(0,0,64,64);let c=new Se(a);c.colorSpace=se,this.N=220;let l=new Oe({map:c,transparent:!0,depthWrite:!1});l.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
attribute float fade;
varying float vFade;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vFade = fade;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying float vFade;`).replace(`#include <color_fragment>`,`#include <color_fragment>
diffuseColor.a *= vFade;`)},l.customProgramCacheKey=()=>`puff`,this.fade=new lt(new Float32Array(this.N),1).setUsage(N);let u=new ce(1,1);u.setAttribute(`fade`,this.fade),this.dust=new ve(u,l,this.N),this.dust.instanceMatrix.setUsage(N),this.dust.frustumCulled=!1,this.c=new q(`#ffffff`);for(let e=0;e<this.N;e++)this.dust.setColorAt(e,this.c);this.dust.instanceColor.setUsage(N),e.add(this.dust),this.puffs=Array.from({length:this.N},()=>({life:0,max:1,x:0,y:0,z:0,vx:0,vy:0,vz:0,size:1,grow:3,opacity:.7,color:`#ffffff`})),this.nextPuff=0,this.clearAround=!1,this.heightAt=()=>0,this.m=new Tt,this.q=new Ft,this.p=new G,this.s=new G}puff(e,t,n,r,i,a,o,s){let c=Lo[s]??Lo.gravel,l=this.puffs[this.nextPuff];this.nextPuff=(this.nextPuff+1)%this.N;let u=c.life*(.7+Math.random()*.6);Object.assign(l,{life:u,max:u,x:e,y:t,z:n,vx:r,vy:i,vz:a,size:o,grow:c.grow,opacity:c.opacity,color:c.color})}burst(e,t,n,r,i,a,o=`gravel`){for(let s=0;s<r;s++){let r=Math.random()*6.283;this.puff(e,t,n,Math.cos(r)*i*(.4+Math.random()),.4+Math.random()*i*.4,Math.sin(r)*i*(.4+Math.random()),a*(.7+Math.random()*.6),o)}}update(e,t,n){let r=e.velocity;for(let n of e.wheels){let e=n.inContact&&n.axisL,i=n.surface,a=e?n.slip:0,o=Math.abs(n.vz)+Math.abs(n.vx),s=e&&Math.abs(n.contact.y-this.heightAt(n.contact.x,n.contact.z))<.6,c=Math.min(1,Math.max(0,(a-1.35)/2.2));for(let t of Object.keys(this.marks)){let r=this.marks[t][n.index],l=t===i&&s&&o>.6&&(t!==`tarmac`||a>1.4),u=t===`tarmac`?Math.min(1,.25+c):Math.min(1,.32+c*.8);e?r.add(n.contact.x,n.contact.y+.03,n.contact.z,n.axisL.x*.13,(n.axisL.y??0)*.13,n.axisL.z*.13,u,l):r.add(0,0,0,0,0,0,0,!1),r.flush()}if(!e||o<1)continue;let l=0;l=i===`tarmac`?c*16:c*24+Math.min(1,o/30)*4;let u=l*t;for(;u>0;){if(Math.random()<u){let e=r.x*.1-n.spin*n.radius*n.axisF.x*.12,t=r.z*.1-n.spin*n.radius*n.axisF.z*.12;this.puff(n.contact.x,n.contact.y+.22,n.contact.z,e+(Math.random()-.5)*1.2,(i===`tarmac`?.6:.9)+Math.random(),t+(Math.random()-.5)*1.2,.6+Math.random()*.5+c*.4,i)}--u}}n&&this.q.copy(n.quaternion);let i=0;for(let e=0;e<this.N;e++){let r=this.puffs[e];if(r.life<=0)continue;r.life-=t,r.x+=r.vx*t,r.y+=r.vy*t,r.z+=r.vz*t;let a=Math.max(0,1-1.8*t);r.vx*=a,r.vz*=a,r.vy*=a;let o=Math.max(0,r.life/r.max),s=r.size*(1+(1-o)*r.grow);this.m.compose(this.p.set(r.x,r.y,r.z),this.q,this.s.set(s,s,s)),this.dust.setMatrixAt(i,this.m),this.dust.setColorAt(i,this.c.set(r.color));let c=1;if(this.clearAround&&n){let e=n.position;c=Math.min(1,Math.max(0,(Math.hypot(r.x-e.x,r.y-e.y,r.z-e.z)-s*.5-1)/2))}this.fade.array[i]=o*o*r.opacity*c,i++}this.dust.count=i,this.dust.instanceMatrix.needsUpdate=!0,this.dust.instanceColor.needsUpdate=!0,this.fade.needsUpdate=!0}reset(){for(let e of Object.values(this.marks))for(let t of e)t.clear();for(let e of this.puffs)e.life=0;this.dust.count=0}},zo=[{name:`pelvis`,bones:[`Hips`],from:`Hips`,to:`Spine`,radius:.13,mass:12},{name:`chest`,bones:[`Spine`,`Spine1`,`Spine2`,`LeftShoulder`,`RightShoulder`],from:`Spine`,to:`Neck`,radius:.15,mass:24},{name:`head`,bones:[`Neck`,`Head`],from:`Neck`,to:`Head`,radius:.1,mass:5,extend:.14},{name:`armL`,bones:[`LeftArm`],from:`LeftArm`,to:`LeftForeArm`,radius:.055,mass:2.5},{name:`armR`,bones:[`RightArm`],from:`RightArm`,to:`RightForeArm`,radius:.055,mass:2.5},{name:`foreL`,bones:[`LeftForeArm`,`LeftHand`],from:`LeftForeArm`,to:`LeftHand`,radius:.05,mass:1.5,extend:.12},{name:`foreR`,bones:[`RightForeArm`,`RightHand`],from:`RightForeArm`,to:`RightHand`,radius:.05,mass:1.5,extend:.12},{name:`thighL`,bones:[`LeftUpLeg`],from:`LeftUpLeg`,to:`LeftLeg`,radius:.08,mass:9},{name:`thighR`,bones:[`RightUpLeg`],from:`RightUpLeg`,to:`RightLeg`,radius:.08,mass:9},{name:`shinL`,bones:[`LeftLeg`,`LeftFoot`,`LeftToeBase`],from:`LeftLeg`,to:`LeftFoot`,radius:.065,mass:5},{name:`shinR`,bones:[`RightLeg`,`RightFoot`,`RightToeBase`],from:`RightLeg`,to:`RightFoot`,radius:.065,mass:5}],Bo=[[`pelvis`,`chest`,`Spine`,`ball`],[`chest`,`head`,`Neck`,`ball`],[`chest`,`armL`,`LeftArm`,`ball`],[`chest`,`armR`,`RightArm`,`ball`],[`armL`,`foreL`,`LeftForeArm`,`hinge`,0,2.4],[`armR`,`foreR`,`RightForeArm`,`hinge`,-2.4,0],[`pelvis`,`thighL`,`LeftUpLeg`,`ball`],[`pelvis`,`thighR`,`RightUpLeg`,`ball`],[`thighL`,`shinL`,`LeftLeg`,`hinge`,0,2.4],[`thighR`,`shinR`,`RightLeg`,`hinge`,0,2.4]],Vo=new G,Ho=new G,Uo=new G,Wo=new Ft,Go=new Tt,Ko=new G(0,1,0),qo=new G(1,1,1);function Jo(e){let t=e.scene;t.updateMatrixWorld(!0);let n=new Set(e.animations.flatMap(e=>e.tracks.map(e=>e.name.split(`.`)[0]))),r=[];t.traverse(e=>{(n.has(e.name)||zo.some(t=>t.bones.includes(e.name)))&&r.push(e)});let i=new Map(r.map((e,t)=>[e,t])),a=[];t.traverse(e=>{if(!e.isMesh)return;let t=e.parent;for(;t&&!i.has(t);)t=t.parent;if(!t)return;let n=e.geometry.clone().applyMatrix4(e.matrixWorld),r=n.attributes.position.count,o=new q().copy(e.material.color),s=new Float32Array(r*3),c=new Uint16Array(r*4),l=new Float32Array(r*4);for(let e=0;e<r;e++)s.set([o.r,o.g,o.b],e*3),c[e*4]=i.get(t),l[e*4]=1;let u=new ze;u.setIndex(n.index),u.setAttribute(`position`,n.attributes.position),u.setAttribute(`normal`,n.attributes.normal),u.setAttribute(`color`,new K(s,3)),u.setAttribute(`skinIndex`,new K(c,4)),u.setAttribute(`skinWeight`,new K(l,4)),a.push(u)});let o=V(a,!1);return o.computeBoundingSphere(),{geometry:o,material:new Ot({vertexColors:!0,roughness:.5,metalness:.05}),inverses:r.map(e=>new Tt().copy(e.matrixWorld).invert()),parents:r.map(e=>{let t=e.parent;for(;t&&!i.has(t);)t=t.parent;return t?i.get(t):-1}),rest:r.map(e=>({name:e.name,world:e.matrixWorld.clone()})),clips:new Map(e.animations.map(e=>[e.name,e]))}}var Yo=class{constructor(e,t,n,{position:r,yaw:i=0,clip:o=`idle`,groups:s,phase:c=0}){this.RAPIER=e,this.world=t,this.groups=s,this.home={position:{...r},yaw:i},this.falling=!1,this.bones=n.rest.map(e=>{let t=new je;return t.name=e.name,t}),this.byName=new Map(this.bones.map(e=>[e.name,e]));let l=new Tt,u=null;n.rest.forEach((e,t)=>{let r=n.parents[t];l.copy(e.world),r>=0&&l.premultiply(Go.copy(n.rest[r].world).invert()),l.decompose(this.bones[t].position,this.bones[t].quaternion,this.bones[t].scale),r>=0?this.bones[r].add(this.bones[t]):u=this.bones[t]}),this.top=u,this.mesh=new a(n.geometry,n.material),this.mesh.castShadow=!0,this.mesh.receiveShadow=!0,this.mesh.frustumCulled=!1,this.mesh.add(u),this.mesh.bind(new Pt(this.bones,n.inverses),new Tt),this.mixer=new Ye(u),this.action=this.mixer.clipAction(n.clips.get(o)??n.clips.get(`idle`)),this.action.setLoop($e,1/0).play(),this.phase=c,this.action.time=c,this.sensorBody=t.createRigidBody(e.RigidBodyDesc.fixed().setTranslation(r.x,.95,r.z)),this.sensor=t.createCollider(e.ColliderDesc.cylinder(.95,.55).setSensor(!0).setCollisionGroups(s.sensor).setActiveEvents(e.ActiveEvents.COLLISION_EVENTS),this.sensorBody),this.parts=null,this.joints=null,this.stand()}stand(){let{x:e,z:t}=this.home.position;this.falling=!1,this.mesh.position.set(e,0,t),this.mesh.rotation.y=this.home.yaw,this.mesh.updateMatrixWorld(!0);for(let e of this.bones)e.matrixWorldAutoUpdate=!0;if(this.mesh.matrixWorldAutoUpdate=!0,this.action.time=this.phase,this.sensor.setEnabled(!0),this.parts){for(let e of this.joints)this.world.removeImpulseJoint(e,!0);for(let e of this.parts)this.world.removeRigidBody(e.body);this.parts=null,this.joints=null}this.mixer.update(0)}fall(e={x:0,y:0,z:0}){if(this.falling)return;let t=this.RAPIER;this.falling=!0,this.sensor.setEnabled(!1),this.mesh.updateMatrixWorld(!0);for(let e of this.bones)e.updateWorldMatrix(!0,!1);let n=new Map;for(let r of zo){let i=this.byName.get(r.from),a=this.byName.get(r.to);Ho.setFromMatrixPosition(i.matrixWorld),Uo.setFromMatrixPosition(a.matrixWorld);let o=Ho.distanceTo(Uo)+(r.extend??0),s=Vo.subVectors(Uo,Ho).normalize(),c=Ho.clone().addScaledVector(s,o/2);Wo.setFromUnitVectors(Ko,s);let l=this.world.createRigidBody(t.RigidBodyDesc.dynamic().setTranslation(c.x,c.y,c.z).setRotation({x:Wo.x,y:Wo.y,z:Wo.z,w:Wo.w}).setLinvel(e.x,e.y,e.z).setLinearDamping(.02).setAngularDamping(.5).setCcdEnabled(!0)),u=Math.max(.01,o/2-r.radius);this.world.createCollider(t.ColliderDesc.capsule(u,r.radius).setMass(r.mass).setFriction(.6).setRestitution(.1).setCollisionGroups(this.groups.ragdoll),l);let d=new Tt().compose(c,Wo.clone(),qo).invert(),f=r.bones.map(e=>{let t=this.byName.get(e);return{bone:t,offset:new Tt().multiplyMatrices(d,t.matrixWorld)}});n.set(r.name,{body:l,carried:f,inverse:d})}this.parts=[...n.values()],this.joints=[];for(let[e,r,i,a,o,s]of Bo){let c=n.get(e),l=n.get(r);Ho.setFromMatrixPosition(this.byName.get(i).matrixWorld);let u=Ho.clone().applyMatrix4(c.inverse),d=Ho.clone().applyMatrix4(l.inverse),f;if(a===`ball`)f=t.JointData.spherical(u,d);else{let e=new G(1,0,0).applyQuaternion(this.mesh.quaternion);Go.copy(l.inverse);let n=e.transformDirection(Go);f=t.JointData.revolute(u,d,{x:n.x,y:n.y,z:n.z}),f.limitsEnabled=!0,f.limits=[o,s]}let p=this.world.createImpulseJoint(f,c.body,l.body,!0);p.setContactsEnabled(!1),this.joints.push(p)}for(let e of this.bones)e.matrixWorldAutoUpdate=!1,e.matrixAutoUpdate=!1}shove(e,t){if(this.parts)for(let n of this.parts){let r=n.body.linvel();n.body.setLinvel({x:r.x+e.x,y:r.y+e.y,z:r.z+e.z},!0),t&&n.body.setAngvel(t,!0)}}update(e){if(!this.falling)this.mixer.update(e);else for(let e of this.parts){let t=e.body.translation(),n=e.body.rotation();Go.compose(Ho.set(t.x,t.y,t.z),Wo.set(n.x,n.y,n.z,n.w),qo);for(let t of e.carried)t.bone.matrixWorld.multiplyMatrices(Go,t.offset)}}reset(){for(let e of this.bones)e.matrixAutoUpdate=!0;this.stand()}},Xo=(e,t,n)=>Math.min(n,Math.max(t,e)),Zo=(e,t,n)=>{let r=Xo((n-e)/(t-e),0,1);return r*r*(3-2*r)},Qo={outside:1600,hits:3200,engine:7e3,worldGain:.62,engineGain:1.08},$o=class{constructor(){this.context=null,this.buffers={},this.manifest=null,this.last={},this.lastPlayed={},this.played=0,this.engine=null,this.loops={},this.inside=!1,this.wasThrottle=0,this.pops=0,this.popAt=0,this.scraping=0}async load(){this.manifest=await(await fetch(`audio/sounds.json`)).json();let e=this.manifest,t=new Set;for(let n of Object.values(e.engines))for(let e of n.loops)t.add(e.file);for(let n of Object.values(e.loops))t.add(n.file);for(let n of Object.values(e.hits))for(let e of Object.values(n))for(let n of e)t.add(n.file);let n=new OfflineAudioContext(1,44100,44100);await Promise.all([...t].map(async e=>{let t=await fetch(`audio/${e}`);try{this.buffers[e]=await n.decodeAudioData(await t.arrayBuffer())}catch{}}))}start(){if(this.context)return;let e=window.AudioContext??window.webkitAudioContext;if(!e||!this.manifest)return;let t=this.context=new e;this.limiter=t.createDynamicsCompressor(),this.limiter.threshold.value=-10,this.limiter.ratio.value=8,this.limiter.attack.value=.004,this.limiter.release.value=.18,this.master=t.createGain(),this.master.connect(this.limiter).connect(t.destination);let n=e=>{let n=t.createBiquadFilter();n.type=`lowpass`,n.frequency.value=e;let r=t.createGain();return n.connect(r).connect(this.master),{filter:n,gain:r}};this.engineBus=n(18e3),this.worldBus=n(18e3),this.hitBus=n(18e3);for(let[e,n]of Object.entries(this.manifest.loops)){let r=this.buffers[n.file];if(!r)continue;let i=t.createBufferSource();i.buffer=r,i.loop=!0;let a=t.createGain();a.gain.value=0,i.connect(a).connect(this.worldBus.filter),i.start(0,Math.random()*r.duration),this.loops[e]={source:i,gain:a,level:n.gain??1}}this.applyInside(),this.wantedEngine&&this.useEngine(this.wantedEngine)}setInside(e){this.inside=e,this.applyInside()}applyInside(){if(!this.context)return;let e=this.context.currentTime,t=(t,n)=>t.setTargetAtTime(n,e,.06);t(this.engineBus.filter.frequency,this.inside?Qo.engine:18e3),t(this.worldBus.filter.frequency,this.inside?Qo.outside:18e3),t(this.hitBus.filter.frequency,this.inside?Qo.hits:18e3),t(this.worldBus.gain.gain,this.inside?Qo.worldGain:1),t(this.engineBus.gain.gain,this.inside?Qo.engineGain:1)}useEngine(e){if(this.wantedEngine=e,!this.context||this.engine?.name===e)return;this.stopEngine();let t=this.manifest.engines[e];if(!t)return;let n=this.context,r=n.createBiquadFilter();r.type=`lowpass`,r.frequency.value=12e3;let i=n.createGain();i.gain.value=0,r.connect(i).connect(this.engineBus.filter);let a=[];for(let e of t.loops){let t=this.buffers[e.file];if(!t)continue;let i=n.createBufferSource();i.buffer=t,i.loop=!0;let o=n.createGain();o.gain.value=0,i.connect(o).connect(r),i.start(0,Math.random()*t.duration),a.push({source:i,gain:o,rpm:e.rpm,level:e.gain??1})}this.engine={name:e,loops:a,tone:r,out:i,level:t.gain??1,popKind:t.pops,offTone:t.offTone??1500,offGain:t.offGain??.5}}stopEngine(){if(this.engine){for(let e of this.engine.loops)e.source.stop();this.engine.out.disconnect(),this.engine=null}}update(e,t,n=1){let r=this.context;if(!r||r.state!==`running`)return;let i=r.currentTime,a=(e,t,n=.03)=>e.setTargetAtTime(t,i,n),o=this.engine;if(o&&o.loops.length){let t=e.rpm,r=o.loops,s=r.findIndex(e=>e.rpm>=t);s<0&&(s=r.length-1);let c=Math.max(0,s-1),l=s===c?1:Xo((t-r[c].rpm)/(r[s].rpm-r[c].rpm),0,1);r.forEach((e,r)=>{let i=r===s?Math.sin(l*Math.PI/2):r===c?Math.cos(l*Math.PI/2):0;a(e.gain.gain,i*e.level,.02),a(e.source.playbackRate,Xo(t/e.rpm*n,.4,2.4),.012)});let u=e.shifting>0?0:e.throttleOut??0,d=Zo(0,.7,u);a(o.tone.frequency,o.offTone+(14e3-o.offTone)*d,.05),a(o.out.gain,o.level*(o.offGain+(1-o.offGain)*d),.05);let f=e.input.throttle;o.popKind&&this.wasThrottle>.6&&f<.1&&t>4200&&Math.random()<.7&&(this.pops=1+Math.floor(Math.random()*3),this.popAt=i+.05+Math.random()*.08),this.pops>0&&i>=this.popAt&&u<.3&&(this.play(o.popKind,.4+Math.random()*.4,1,n,this.engineBus.filter),this.pops--,this.popAt=i+.07+Math.random()*.16),this.wasThrottle=f}let s=Math.hypot(e.velocity.x,e.velocity.z),c=0,l=0,u=0,d=0,f=0;for(let t of e.wheels)t.inContact&&(t.surface===`tarmac`?(c++,d=Math.max(d,t.slip)):(t.surface===`grass`?u++:l++,f=Math.max(f,t.slip)));let p=(e,t,r)=>{let i=this.loops[e];i&&(a(i.gain.gain,i.level*t,.07),r!==void 0&&a(i.source.playbackRate,r*n,.08))},m=Zo(.5,42,s),h=e.wheels.length;p(`road`,c/h*m**.8,.8+m*.5),p(`gravel`,(l+u*.7)/h*Math.min(1,m**.7+Zo(1.2,4,f)*Zo(1,6,s)*.5),.82+m*.4),p(`squeal`,Zo(1.25,3.2,d)*Zo(1.5,7,s),.9+Xo(d/16,0,.3)),p(`wind`,Zo(10,75,s)**1.6*(this.inside?.7:1),.85+m*.35),this.scraping=Math.max(0,this.scraping-t*5),p(`scrape`,this.scraping*Zo(1,14,s),.85+m*.4)}scrape(e){this.scraping=Math.max(this.scraping,Xo(e,0,1))}play(e,t,n=1,r=1,i=null){let a=this.context;if(!a||a.state!==`running`||t<.03)return;let o=a.currentTime;if(o-(this.lastPlayed[e]??-1)<.025)return;this.lastPlayed[e]=o;let s=this.manifest.hits[e];if(!s)return;let c=(t>.5?s.heavy:s.light)??s.heavy??s.light;if(!c?.length)return;let l=c.length>1?c.filter(t=>t!==this.last[e]):c,u=l[Math.floor(Math.random()*l.length)];this.last[e]=u;let d=this.buffers[u.file];if(!d)return;let f=a.createBufferSource();f.buffer=d,f.playbackRate.value=n*r*(.92+Math.random()*.16);let p=a.createGain();p.gain.value=Xo(t,0,1)**1.2*(u.gain??1)*(.88+Math.random()*.12);let m=a.createStereoPanner?a.createStereoPanner():null;m?(m.pan.value=(Math.random()-.5)*.5,f.connect(p).connect(m).connect(i??this.hitBus.filter)):f.connect(p).connect(i??this.hitBus.filter),f.start(),this.played++}setVisible(e){this.context&&(e?this.context.resume():this.context.suspend())}},es=62,ts=.05,ns=.7,rs=.55,is=.0045,as=.04,os=.04,ss=.025,cs=new Ft().setFromAxisAngle(new G(0,1,0),Math.PI),ls=new G,us=new G,ds=new G,fs=new G,ps=new G,ms=new Ft,hs=new Ft,gs=new Ft,_s=new oe(0,0,0,`YXZ`),vs=new oe(0,0,0,`YXZ`),ys=class{constructor(e){this.camera=e,this.eye=new G,this.model=null,this.lastVelocity=new G,this.sway=new G,this.reset()}seat(e,t){this.model=e,this.eye.copy(t),this.settle()}settle(){this.sway.set(0,0,0),this.fresh=!0,this.pitch=null,this.roll=0,this.corner=0,this.knock=0,this.knockSpeed=0}reset(){this.yawOffset=0,this.pitchOffset=0,this.holding=!1,this.settle()}jump(){this.settle()}glideIn(){}fit(){}scroll(){}kick(e=1){this.knockSpeed=e*.6*(Math.random()<.5?-1:1)}drag(e,t){this.holding=!0,this.yawOffset=Math.max(-1.9,Math.min(1.9,this.yawOffset-e*.004)),this.pitchOffset=Math.max(-.55,Math.min(.5,this.pitchOffset-t*.003))}release(){this.holding=!1}update(e,t,n){if(!this.model)return;let r=this.model.object.quaternion;ls.set(0,0,1).applyQuaternion(r),us.set(0,1,0).applyQuaternion(r),ds.set(1,0,0).applyQuaternion(r);let i=Math.atan2(ls.x,ls.z),a=Math.asin(Re.clamp(ls.y,-1,1)),o=Math.atan2(ds.y,Math.max(.001,us.y));if(this.fresh||n<=0)this.lastVelocity.set(e.velocity.x,e.velocity.y,e.velocity.z),this.pitch=a,this.roll=o,this.fresh=!1;else{ps.set(e.velocity.x,e.velocity.y,e.velocity.z).sub(this.lastVelocity).divideScalar(n),this.lastVelocity.set(e.velocity.x,e.velocity.y,e.velocity.z);let t=Math.min(1,n*5);this.sway.x+=(Re.clamp(-ps.dot(ds)*is,-.04,as)-this.sway.x)*t,this.sway.z+=(Re.clamp(-ps.dot(ls)*is,-.04,os)-this.sway.z)*t,this.sway.y+=(Re.clamp(-ps.dot(us)*is,-.025,ss)-this.sway.y)*t;let r=Math.min(1,n*14);this.pitch+=(a-this.pitch)*r,this.roll+=(o-this.roll)*r}let s=Math.hypot(e.velocity.x,e.velocity.z),c=e.wheels.filter(e=>e.front),l=c.reduce((e,t)=>e+t.steerAngle,0)/(c.length||1)*.16;if(e.forwardSpeed>5&&s>5){let t=Math.atan2(e.velocity.x,e.velocity.z)-i;for(;t>Math.PI;)t-=2*Math.PI;for(;t<-Math.PI;)t+=2*Math.PI;l+=Re.clamp(t*.3,-.32,.32)}if(this.corner+=(l-this.corner)*Math.min(1,n*3.5),this.knockSpeed+=-this.knock*120*n,this.knock+=this.knockSpeed*n,this.knockSpeed*=Math.max(0,1-6*n),!this.holding){let e=Math.min(1,n*2.5);this.yawOffset-=this.yawOffset*e,this.pitchOffset-=this.pitchOffset*e}let u=this.camera,d=es+5*Re.smoothstep(Math.abs(e.forwardSpeed),12,48);Math.abs(d-u.fov)>.02&&(u.fov=d,u.updateProjectionMatrix()),fs.copy(this.eye).add(this.sway),fs.applyQuaternion(r).add(this.model.object.position),u.position.copy(fs),_s.set(this.pitch*ns,i+Math.PI+this.corner,-this.roll*rs+this.knock),ms.setFromEuler(_s),hs.copy(r).multiply(cs);let f=ms.slerp(hs,1-Re.smoothstep(us.y,.25,.7));vs.set(this.pitchOffset,this.yawOffset,0),gs.setFromEuler(vs),u.quaternion.copy(f).multiply(gs)}apply(){}},bs=new G,xs=e=>{for(;e>Math.PI;)e-=2*Math.PI;for(;e<-Math.PI;)e+=2*Math.PI;return e},Ss=class{constructor(e,t){this.camera=e,this.at=new G,this.heading=0,this.yawOffset=0,this.pitch=.33,this.zoom=1,this.pulled=0,this.roll=0,this.rollSpeed=0,this.glide=0,this.glideRate=1,this.fit(t)}fit(e){this.distance=1.75*e.size.length+1.5,this.lift=e.size.height*.55}kick(e=1){this.rollSpeed=e*(Math.random()<.5?-1:1)}reset(e){this.yawOffset=0,this.pitch=.33,this.zoom=1,this.pulled=0,this.roll=0,this.rollSpeed=0,this.glide=0,this.jump(e)}glideIn(e=1.5){this.glide=1,this.glideRate=1/e,this.apply()}jump(e){this.heading=Math.atan2(e.forward.x,e.forward.z),this.at.set(e.position.x,e.position.y,e.position.z),this.apply()}drag(e,t){this.yawOffset-=e*.005,this.pitch=Math.min(1.35,Math.max(.06,this.pitch+t*.004))}scroll(e){this.zoom=Math.min(3.5,Math.max(.55,this.zoom*Math.exp(e*8e-4)))}update(e,t,n){let r=Math.atan2(e.forward.x,e.forward.z),i=Math.hypot(e.velocity.x,e.velocity.z),a=r;e.forwardSpeed>3&&i>3&&(a=r+xs(Math.atan2(e.velocity.x,e.velocity.z)-r)*.55),e.upsideDown.active&&(a=this.heading),this.heading=xs(this.heading+xs(a-this.heading)*Math.min(1,n*3.2));let o=Math.min(1,n*16);this.at.x+=(t.x-this.at.x)*o,this.at.y+=(t.y-this.at.y)*Math.min(1,n*7),this.at.z+=(t.z-this.at.z)*o;let s=Re.smoothstep(i,8,45)*.35;this.pulled+=(s-this.pulled)*Math.min(1,n*2.5),this.rollSpeed+=-this.roll*100*n,this.roll+=this.rollSpeed*n,this.rollSpeed*=Math.max(0,1-5*n),this.glide=Math.max(0,this.glide-n*this.glideRate),this.apply()}apply(){let e=this.camera,t=this.distance*this.zoom*(1+this.pulled)*(1+.45*this.glide*this.glide*(3-2*this.glide)),n=this.heading+this.yawOffset,r=Math.cos(this.pitch)*t,i=this.at.x-Math.sin(n)*r,a=this.at.z-Math.cos(n)*r;e.position.set(i,Math.max((this.groundAt?.(i,a)??0)+.35,this.at.y+this.lift+Math.sin(this.pitch)*t),a),bs.set(this.at.x,this.at.y+this.lift,this.at.z),e.lookAt(bs),e.rotation.z+=this.roll}},Z=1e3,Cs=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},ws=new Float32Array(65536);{let e=271828;for(let t=0;t<65536;t++)e=e*1664525+1013904223>>>0,ws[t]=e/4294967296}function Ts(e,t){let n=Math.floor(e),r=Math.floor(t),i=e-n,a=t-r,o=i*i*(3-2*i),s=a*a*(3-2*a),c=(e,t)=>ws[e*251+t*65423&65535],l=c(n,r)+(c(n+1,r)-c(n,r))*o;return l+(c(n,r+1)+(c(n+1,r+1)-c(n,r+1))*o-l)*s}function Es(e,t,n=4){let r=0,i=.5,a=1;for(let o=0;o<n;o++)r+=i*Ts(e*a+o*37.1,t*a-o*11.3),i*=.5,a*=2.03;return r}var Ds=(e,t)=>Math.max(0,Math.abs(e)-150-6,Math.abs(t)-150-6);function Os(e,t){let n=(Es(e/520,t/520,3)-.44)*120,r=(Es(e/120,t/120,4)-.47)*26,i=Cs(620,980,Math.max(Math.abs(e),Math.abs(t)))*70;return(n+r+i)*Cs(6,130,Ds(e,t))}var ks=[[140,0,`s`,5.2],[230,1,`s`,4.6],[330,-6,`s`,4.4],[430,-20,`s`,4.4],[525,-62,`s`,4.4],[590,-135,`s`,4.4],[612,-225,`g`,4.2],[572,-300,`g`,4.2],[490,-322,`g`,4.2],[415,-296,`g`,4.4],[352,-304,`g`,5],[322,-326,`g`,6],[326,-358,`g`,6],[356,-372,`g`,5],[452,-424,`g`,4.2],[540,-486,`g`,4.4],[574,-544,`g`,5.6],[566,-586,`g`,6],[530,-606,`g`,5.6],[420,-606,`g`,4.2],[285,-584,`g`,4.2],[165,-548,`g`,4.2],[50,-592,`g`,4.2],[-70,-540,`g`,4.2],[-190,-578,`g`,4.2],[-300,-520,`g`,4.4],[-390,-566,`g`,4.4],[-498,-530,`g`,4.4],[-586,-440,`g`,4.4],[-560,-344,`g`,4.2],[-612,-252,`g`,4.2],[-566,-160,`s`,4.4],[-462,-70,`s`,4.4],[-330,-14,`s`,4.6],[-210,-1,`s`,5.2],[-135,0,`s`,8]],As=[[.1,1.6,34],[.16,1.2,40],[.3,1.5,26],[.46,1.1,30],[.52,1.9,16],[.58,1.4,22],[.64,1.9,18],[.72,1.3,24],[.9,1.6,40]],js=2;function Ms(){let e=ks.map(([e,t,n,r])=>{let i=ft(e,t);return{x:i.x,z:i.z,sealed:+(n===`s`),half:r}}),t=ft(100,0),n=ft(-100,0),r=[{...e[0],x:t.x,z:t.z},...e,{...e[e.length-1],x:n.x,z:n.z}],i=[];for(let e=1;e<r.length-2;e++){let[t,n,a,o]=[r[e-1],r[e],r[e+1],r[e+2]];for(let e=0;e<40;e++){let r=e/40,s=r*r,c=s*r,l=e=>.5*(2*n[e]+(a[e]-t[e])*r+(2*t[e]-5*n[e]+4*a[e]-o[e])*s+(3*n[e]-t[e]-3*a[e]+o[e])*c);i.push({x:l(`x`),z:l(`z`),sealed:n.sealed+(a.sealed-n.sealed)*Cs(.2,.8,r),half:n.half+(a.half-n.half)*r})}}i.push({...r[r.length-2]});let a=[],o=0,s=0;for(let e=0;e<i.length-1;e++){let t=i[e],n=i[e+1],r=Math.hypot(n.x-t.x,n.z-t.z);for(;o<=r;){let e=o/(r||1);a.push({x:t.x+(n.x-t.x)*e,z:t.z+(n.z-t.z)*e,sealed:t.sealed+(n.sealed-t.sealed)*e,half:t.half+(n.half-t.half)*e,s:s+o}),o+=js}o-=r,s+=r}let c=s,l=a.map(e=>Os(e.x,e.z));for(let e=0;e<a.length;e++){let t=0,n=0;for(let r=Math.max(0,e-34);r<=Math.min(a.length-1,e+34);r++)t+=l[r],n++;let r=a[e],i=t/n;for(let[e,t,n]of As){let a=(r.s-e*c)/n;i+=t*Math.exp(-a*a)}let o=Cs(0,90,r.s)*Cs(0,90,c-r.s);r.y=i*o}for(let e=0;e<a.length;e++){let t=a[Math.max(0,e-2)],n=a[Math.min(a.length-1,e+2)],r=Math.hypot(n.x-t.x,n.z-t.z)||1,i=a[e];i.dx=(n.x-t.x)/r,i.dz=(n.z-t.z)/r,i.sx=i.dz,i.sz=-i.dx}let u=a.map((e,t)=>{let n=a[Math.max(0,t-6)],r=a[Math.min(a.length-1,t+6)];return(n.dx*r.dz-n.dz*r.dx)/24});return a.forEach((e,t)=>{let n=0,r=0;for(let e=Math.max(0,t-8);e<=Math.min(a.length-1,t+8);e++)n+=u[e],r++;e.bend=n/r,e.bank=Math.max(-.03,Math.min(.03,-e.bend*.8))}),{points:a,length:c}}function Ns(){let e=Ms(),t=new Float32Array(251001),n=new Float32Array(251001).fill(1e6),r=new Float32Array(251001),i=new Float32Array(251001);for(let t of e.points){let e=Math.round((t.x+Z)/4),a=Math.round((t.z+Z)/4);for(let o=Math.max(0,a-8);o<=Math.min(500,a+8);o++)for(let a=Math.max(0,e-8);a<=Math.min(500,e+8);a++){let e=a*4-Z,s=o*4-Z,c=Math.hypot(e-t.x,s-t.z),l=o*501+a;c<n[l]&&(n[l]=c,r[l]=t.y,i[l]=t.half)}}for(let e=0;e<501;e++)for(let a=0;a<501;a++){let o=e*501+a,s=Os(a*4-Z,e*4-Z);if(n[o]<30){let e=Cs(i[o]+5.5,30,n[o]);s=r[o]-.2+(s-(r[o]-.2))*e}t[o]=s}let a=(e,n)=>{let r=Math.min(499.999,Math.max(0,(e+Z)/4)),i=Math.min(499.999,Math.max(0,(n+Z)/4)),a=Math.floor(r),o=Math.floor(i),s=r-a,c=i-o,l=o*501+a,u=t[l],d=t[l+1],f=t[l+501],p=t[l+501+1];return(u+(d-u)*s)*(1-c)+(f+(p-f)*s)*c},o=(e,t)=>Math.hypot(a(e+4,t)-a(e-4,t),a(e,t+4)-a(e,t-4))/8,s=(e,t)=>{let r=Math.round((e+Z)/4),i=Math.round((t+Z)/4);return r<0||i<0||r>=501||i>=501?1e6:n[i*501+r]},c=1001,l=new Uint8Array(c*c),u=(e,t)=>Math.abs(e)<150&&Math.abs(t)<150,d={grass:0,gravel:1,tarmac:2},f=[`grass`,`gravel`,`tarmac`];for(let t of e.points){let e=t.half+.8,n=Math.ceil(e/2),r=Math.round((t.x+Z)/2),i=Math.round((t.z+Z)/2);for(let a=i-n;a<=i+n;a++)for(let i=r-n;i<=r+n;i++)i<0||a<0||i>=c||a>=c||Math.hypot(i*2-1e3-t.x,a*2-1e3-t.z)<=e&&(l[a*c+i]=t.sealed>.5?d.tarmac:d.gravel)}return{road:e,heights:t,heightAt:a,slopeAt:o,distanceAt:s,surfaceAt:(e,t)=>{if(u(e,t))return He(e,t);let n=Math.round((e+Z)/2),r=Math.round((t+Z)/2);return n<0||r<0||n>=c||r>=c?`grass`:f[l[r*c+n]]},woodAt:(e,t)=>Cs(.42,.56,Es(e/190+40,t/190-12,3))*Cs(8,26,s(e,t)-2)*Cs(14,40,Ds(e,t)),inYard:u,outsideYard:Ds}}var Ps={pine:{bark:`bark-pine`,leaf:`pine-leaf`,tall:[17,27]},aspen:{bark:`bark-aspen`,leaf:`aspen-leaf`,tall:[12,19]}},Fs=new G(0,1,0),Is=new G,Ls=.3;function Rs(e,t,n){e.onBeforeCompile=e=>{e.uniforms.windTime=t,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
uniform float windTime;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
			#ifdef USE_INSTANCING
			float windSeed = instanceMatrix[3][0] * 0.13 + instanceMatrix[3][2] * 0.17;
			#else
			float windSeed = 0.0;
			#endif
			float windHigh = position.y * position.y * 0.0004;
			transformed.x += sin(windTime * 1.3 + windSeed + position.y * 0.1) * windHigh;
			transformed.z += cos(windTime * 1.1 + windSeed * 1.3 + position.x * 0.2) * windHigh * 0.7;`)},e.customProgramCacheKey=()=>n}var zs={value:new Tt},Bs={value:new G},Vs={value:new G};function Hs(e,t){let n=e.onBeforeCompile;e.onBeforeCompile=(t,r)=>{n.call(e,t,r),Object.assign(t.uniforms,{carInverse:zs,carMiddle:Bs,carExtent:Vs}),t.vertexShader=t.vertexShader.replace(`#include <common>`,`#include <common>
uniform mat4 carInverse;
varying vec3 vInCar;`).replace(`#include <project_vertex>`,`#include <project_vertex>
				#ifdef USE_INSTANCING
					vInCar = (carInverse * modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;
				#else
					vInCar = vec3(1e4);
				#endif`),t.fragmentShader=t.fragmentShader.replace(`#include <common>`,`#include <common>
uniform vec3 carMiddle, carExtent;
varying vec3 vInCar;`).replace(`#include <clipping_planes_fragment>`,`#include <clipping_planes_fragment>
				if (all(lessThan(abs(vInCar - carMiddle), carExtent))) discard;`)},e.customProgramCacheKey=()=>t}async function Us({R:e,group:t,shape:n,maps:r,solid:i,unsolid:a,light:o,loader:s,renderer:c,sun:l}){let[d,f]=await Promise.all([fetch(`stage/trees.json`).then(e=>e.json()),fetch(`stage/trees.bin`).then(e=>e.arrayBuffer())]),p={value:0},h=async(e,t,n)=>{let r=await s.loadAsync(`stage/${e}.webp`);return t&&(r.colorSpace=se),n&&(r.wrapS=r.wrapT=ie),r.anisotropy=4,r},g={};for(let[e,t]of Object.entries(Ps)){let[n,r]=await Promise.all([h(t.bark,!0,!0),h(t.leaf,!0,!1)]),i=new Ot({map:n,roughness:.95}),a=new Ot({map:r,roughness:.82,alphaTest:.45,side:2});Rs(a,p,`stage-leaf`),Hs(i,`stage-bark-clear`),Hs(a,`stage-leaf-clear`);let o=e=>{let t=new ze,n=(e,t)=>new e(f,t.at,t.length);return t.setAttribute(`position`,new K(n(Float32Array,e.position),3)),t.setAttribute(`normal`,new K(n(Float32Array,e.normal),3)),t.setAttribute(`uv`,new K(n(Float32Array,e.uv),2)),t.setIndex(new K(n(Uint32Array,e.index),1)),t},s={};for(let t of[`near`,`mid`]){let n=d[e][t];s[t]={branches:o(n.branches),leaves:o(n.leaves),height:n.height}}g[e]={...t,barkMaterial:i,leafMaterial:a,tiers:s}}let _=new Ge(-.5,.5,1,0,.1,400),v=new w;v.add(new y(`#c9d9ea`,`#6e6240`,1.2));let b=new ne(`#fff0dc`,3);b.position.set(.6,.75,.9),v.add(b);for(let[,e]of Object.entries(g)){let{branches:t,leaves:n,height:r}=e.tiers.near,i=[new Mt(t,e.barkMaterial),new Mt(n,e.leafMaterial)];for(let e of i)v.add(e);n.computeBoundingBox();let a=n.boundingBox,s=Math.max(Math.abs(a.min.x),a.max.x,Math.abs(a.min.z),a.max.z)*1.04,l=s*2;Object.assign(_,{left:-s,right:s,top:r*1.02,bottom:0}),_.position.set(0,r/2,200),_.lookAt(0,r/2,0),_.updateProjectionMatrix();let u=new ke(o?128:256,o?256:512,{generateMipmaps:!0,minFilter:gt}),d=c.getClearAlpha(),f=new q;c.getClearColor(f),c.setClearColor(`#2e3a1e`,0),c.setRenderTarget(u),c.clear(),c.render(v,_),c.setRenderTarget(null),c.setClearColor(f,d),e.picture=u.texture,e.pictureAspect=l/(r*1.02);for(let e of i)v.remove(e)}let x={pine:[],aspen:[]},S=o?12:8.5,C=987654,T=()=>(C=C*1664525+1013904223>>>0,C/4294967296);for(let e=-Z+8;e<Z-8;e+=S)for(let t=-Z+8;t<Z-8;t+=S){let r=t+(T()-.5)*S*.9,i=e+(T()-.5)*S*.9,a=T(),o=T(),s=T(),c=T();if(a>n.woodAt(r,i)*.92+.006||n.distanceAt(r,i)<11||n.slopeAt(r,i)>.7||n.outsideYard(r,i)<6)continue;let l=o<(Es(r/90,i/90,2)>.5?.35:.06)?`aspen`:`pine`,[u,d]=Ps[l].tall;x[l].push({x:r,y:n.heightAt(r,i)-.1,z:i,tall:u+(d-u)*s*s,yaw:c*6.283})}let D=new Map,O=new Map,k=[],ee={x:-1,z:-1},A=(e,t)=>Math.floor((e+Z)/64)<<12|Math.floor((t+Z)/64),te=o?34:62,j=o?120:210;for(let[e,n]of Object.entries(x)){let r=g[e];r.list=n;let i=r.tiers.near.height;n.forEach(t=>{t.matrix=new Tt().compose(new G(t.x,t.y,t.z),new Ft().setFromAxisAngle(Fs,t.yaw),new G(1,1,1).multiplyScalar(t.tall/i)),t.kind=e;let n=A(t.x,t.z);D.has(n)||D.set(n,[]),D.get(n).push(t)});let a={near:o?40:90,mid:o?200:500};r.meshes={};for(let e of[`near`,`mid`]){let{branches:n,leaves:i}=r.tiers[e],o=(n,r)=>{let i=new ve(n,r,a[e]);return i.instanceMatrix.setUsage(N),i.frustumCulled=!1,i.count=0,i.castShadow=e===`near`,i.receiveShadow=!0,t.add(i),i};r.meshes[e]=[o(n,r.barkMaterial),o(i,r.leafMaterial)],r.meshes[e].cap=a[e]}let s=new E,c=new ce(1,1).translate(0,.5,0);s.index=c.index,s.setAttribute(`position`,c.getAttribute(`position`)),s.setAttribute(`uv`,c.getAttribute(`uv`)),s.setAttribute(`normal`,c.getAttribute(`normal`));let l=new Float32Array(n.length*4);n.forEach((e,t)=>l.set([e.x,e.y,e.z,e.tall],t*4)),s.setAttribute(`aSpot`,new lt(l,4)),s.instanceCount=n.length;let u=new Ot({map:r.picture,alphaTest:.5,roughness:1});u.onBeforeCompile=e=>{e.uniforms.farFrom={value:j},e.uniforms.pictureAspect={value:r.pictureAspect},e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
attribute vec4 aSpot;
uniform float farFrom;
uniform float pictureAspect;`).replace(`#include <begin_vertex>`,`vec3 toCamera = cameraPosition - aSpot.xyz;
					vec2 flat2 = normalize(toCamera.xz);
					vec3 sideways = vec3(flat2.y, 0.0, -flat2.x);
					float present = step(farFrom, length(toCamera));
					vec3 transformed = aSpot.xyz + (sideways * position.x * aSpot.w * pictureAspect + vec3(0.0, position.y * aSpot.w, 0.0)) * present;`).replace(`#include <beginnormal_vertex>`,`vec3 objectNormal = normalize(vec3(cameraPosition.x - aSpot.x, 12.0, cameraPosition.z - aSpot.z));`)},u.customProgramCacheKey=()=>`stage-tree-picture`;let d=new Mt(s,u);d.frustumCulled=!1,d.receiveShadow=!1,t.add(d),r.far=d}let M=o?22e3:11e4,P={value:new G},ae={value:new pt(0,1)},oe={value:new pt(1,2)},F=o?56:100,I=new Uint16Array(251001);for(let e=0;e<I.length;e++)I[e]=re.toHalfFloat(n.heights[e]);let L=new u(I,501,501,m,ge);L.minFilter=L.magFilter=gt,L.needsUpdate=!0;let le=[],ue=[];for(let e=0;e<3;e++){let t=e/3*6.283+.4,n=Math.cos(t*1.7)*.12,r=Math.sin(t*1.3)*.12,i=Math.cos(t)*.045,a=Math.sin(t)*.045,o=.22;le.push(n-i,0,r-a,n+i,0,r+a,n+Math.sin(t)*o,1,r-Math.cos(t)*o),ue.push(0,0,1)}let de=new E;de.setAttribute(`position`,new K(new Float32Array(le),3)),de.setAttribute(`aShade`,new K(new Float32Array(ue),1)),de.setAttribute(`normal`,new K(new Float32Array(le.length).map((e,t)=>+(t%3==1)),3));let R=new Float32Array(M*3);for(let e=0;e<M*3;e++)R[e]=T();de.setAttribute(`aSeed`,new lt(R,3)),de.instanceCount=M;let fe=new Ot({roughness:.9,side:2});fe.onBeforeCompile=e=>{Object.assign(e.uniforms,{tHeight:{value:L},tSplat:{value:r.splat},tGrass:{value:r.grass},grassSpan:{value:F},landSpan:{value:Z*2},windTime:p,landCell:{value:Z*2/500},carAt:P,carAxis:ae,carHalf:oe}),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
				attribute vec3 aSeed;
				attribute float aShade;
				uniform sampler2D tHeight, tSplat, tGrass;
				uniform float grassSpan, landSpan, windTime, landCell;
				uniform vec3 carAt;
				uniform vec2 carAxis, carHalf;
				varying vec3 vBlade;`).replace(`#include <begin_vertex>`,`vec2 local = mod(aSeed.xy * grassSpan - cameraPosition.xz + grassSpan * 0.5, grassSpan) - grassSpan * 0.5;
				vec2 spot = cameraPosition.xz + local;
				vec2 spotUv = spot / landSpan + 0.5;
				float grows = textureLod(tSplat, spotUv, 0.0).r;
				float ring = 1.0 - smoothstep(grassSpan * 0.32, grassSpan * 0.5, length(local));
				float tall = smoothstep(0.25, 0.5, grows) * ring * (0.22 + aSeed.z * 0.42);
				// Flat under the car, whichever way it's facing, with room for a blade's lean. carAt.z is 0 once it's flown clear of the grass.
				vec2 fromCar = spot - carAt.xy;
				vec2 outside = abs(vec2(dot(fromCar, carAxis), dot(fromCar, vec2(-carAxis.y, carAxis.x)))) - carHalf;
				tall *= mix(1.0, smoothstep(0.0, 0.3, length(max(outside, 0.0))), carAt.z);
				float turn = aSeed.z * 6.283;
				vec3 turned = vec3(position.x * cos(turn) - position.z * sin(turn), position.y * tall, position.x * sin(turn) + position.z * cos(turn));
				turned.xz *= smoothstep(0.0, 0.08, tall);
				turned.x += sin(windTime * 1.7 + spot.x * 0.4 + spot.y * 0.3) * 0.09 * position.y * tall;
				float groundHere = textureLod(tHeight, (spot + landSpan * 0.5) / (landSpan + landCell) + 0.5 * landCell / (landSpan + landCell), 0.0).r;
				vec3 transformed = vec3(spot.x, groundHere, spot.y) + turned;
				vec3 bladeColour = mix(vec3(0.24, 0.26, 0.07), vec3(0.42, 0.42, 0.13), aSeed.y);
				vBlade = bladeColour * mix(0.5, 1.2, aShade);`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying vec3 vBlade;`).replace(`#include <map_fragment>`,`diffuseColor.rgb = vBlade;`).replace(`#include <normal_fragment_maps>`,`normal = normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);`)},fe.customProgramCacheKey=()=>`stage-grass`;let pe=new Mt(de,fe);pe.frustumCulled=!1,pe.receiveShadow=!0,t.add(pe);let z=new G(1e9,0,0),me=e=>{let t=e.position;if(Math.hypot(t.x-z.x,t.z-z.z)<6)return;z.copy(t);let n={pine:{near:0,mid:0},aspen:{near:0,mid:0}},r=Math.ceil(j/64),i=Math.floor((t.x+Z)/64),a=Math.floor((t.z+Z)/64);for(let e=i-r;e<=i+r;e++)for(let i=a-r;i<=a+r;i++){let r=D.get(e<<12|i);if(r)for(let e of r){let r=Math.hypot(e.x-t.x,e.z-t.z);if(r>=j)continue;let i=r<te?`near`:`mid`,a=g[e.kind],o=n[e.kind];o[i]>=a.meshes[i].cap||(a.meshes[i][0].setMatrixAt(o[i],e.matrix),a.meshes[i][1].setMatrixAt(o[i],e.matrix),o[i]++)}}for(let[e,t]of Object.entries(g))for(let r of[`near`,`mid`])for(let i of t.meshes[r])i.count=n[e][r],i.instanceMatrix.needsUpdate=!0};return{count:{pine:x.pine.length,aspen:x.aspen.length,grass:M},solidAround(t,n){let r=Math.floor((t+Z)/64),o=Math.floor((n+Z)/64);if(r!==ee.x||o!==ee.z){ee.x=r,ee.z=o;for(let[e,t]of O)if(!(Math.abs((e>>12)-r)<=2&&Math.abs((e&4095)-o)<=2)){for(let e of t)a(e);O.delete(e)}for(let[e,t]of[[0,0],[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){let n=r+e<<12|o+t;if(O.has(n)||!D.has(n))continue;let i=[];O.set(n,i);for(let e of D.get(n))k.push({t:e,made:i})}}for(let t=0;t<30&&k.length;t++){let{t,made:n}=k.shift();n===O.get(A(t.x,t.z))&&n.push(i(e.ColliderDesc.cylinder(3,Math.max(.16,t.tall*.012)).setTranslation(t.x,t.y+3,t.z)))}},standing(){return[...x.pine,...x.aspen]},update(e,t,r){if(p.value+=e,me(t),r){let e=r.object,t=e.getWorldDirection(Is),i=Math.hypot(t.x,t.z)||1;ae.value.set(t.x/i,t.z/i),oe.value.set(r.size.length/2+Ls,r.size.width/2+Ls);let a=e.position.y-n.heightAt(e.position.x,e.position.z);P.value.set(e.position.x,e.position.z,1-Math.min(1,Math.max(0,(a-1.6)/.8))),zs.value.copy(e.matrixWorld).invert(),Bs.value.set(0,r.size.height/2,0),Vs.value.set(r.size.width/2+.05,r.size.height/2+.05,r.size.length/2+.05)}},lower(){de.instanceCount=Math.floor(M/2)}}}var Ws=new G(0,1,0);function Gs(e){let t=e.attributes.position,n=[],r=new Set;for(let e=0;e<9;e++){let i=-1+(e+.5)/4.5,a=Math.sqrt(1-i*i);for(let o=0;o<8;o++){let s=o/8*6.283+e,c=Math.cos(s)*a,l=Math.sin(s)*a,u=0,d=-1/0;for(let e=0;e<t.count;e++){let n=t.getX(e)*c+t.getY(e)*i+t.getZ(e)*l;n>d&&(d=n,u=e)}r.has(u)||(r.add(u),n.push(t.getX(u),t.getY(u),t.getZ(u)))}}return n}function Ks(){let e=document.createElement(`canvas`);e.width=256,e.height=128;let t=e.getContext(`2d`);t.fillStyle=`#f2efe6`,t.fillRect(0,0,256,128),t.fillStyle=`#c8321f`;for(let e=-1;e<4;e++){let n=e*80+16;t.beginPath(),t.moveTo(n,0),t.lineTo(n+40,0),t.lineTo(n+92,64),t.lineTo(n+40,128),t.lineTo(n,128),t.lineTo(n+52,64),t.closePath(),t.fill()}let n=new Se(e);return n.colorSpace=se,n}function qs(){let e=document.createElement(`canvas`);e.width=2048,e.height=256;let t=e.getContext(`2d`);t.fillStyle=`#14242b`,t.fillRect(0,0,2048,256),t.fillStyle=`#e8622b`,t.fillRect(0,206,2048,22),t.fillStyle=`#e8b53a`,t.fillRect(0,228,2048,12),t.fillStyle=`#f2efe6`,t.font=`800 120px "Noto Sans KR", "Malgun Gothic", "Apple SD Gothic Neo", "Arial Narrow", Arial, sans-serif`,t.textAlign=`center`,t.textBaseline=`middle`,t.fillText(`노르드비크 랠리`,720,108),t.font=`700 80px "Noto Sans KR", "Malgun Gothic", "Apple SD Gothic Neo", "Arial Narrow", Arial, sans-serif`,t.fillStyle=`#e8b53a`,t.fillText(`오를라 타이어`,1560,108);let n=new Se(e);return n.colorSpace=se,n.anisotropy=8,n}async function Js({R:e,group:t,shape:n,solid:r,light:i}){let a=n.road.points,o=new Tt,s=new Ft,c=new G,l=new G,u=424243,d=()=>(u=u*1664525+1013904223>>>0,u/4294967296),f=new Map,p=[],m=(e,t)=>Math.floor((e+Z)/8)<<12|Math.floor((t+Z)/8),h=(e,t,r,...i)=>{let a=m(e,t);f.has(a)||f.set(a,[]),f.get(a).push({x:e,z:t,y:n.heightAt(e,t),reach:r,parts:i,kept:[]})},g=new Tt().makeScale(0,0,0),_=new G,v=await new na().loadAsync(`stage/rocks.glb`),y=[];v.scene.traverse(e=>{e.isMesh&&y.push(e)});let b=[],x=i?160:420;for(let e=0;e<x*40&&b.length<x;e++){let e=(d()-.5)*(Z*2-40),t=(d()-.5)*(Z*2-40),r=n.distanceAt(e,t);if(r<9||n.outsideYard(e,t)<14)continue;let i=r<34,a=n.slopeAt(e,t)>.3;if(!i&&!a&&Es(e/60,t/60,2)<.55)continue;let o=d();b.push({x:e,z:t,scale:.35+o*o*o*(i?1.5:2.6),yaw:d()*6.283,tilt:d()*.5,piece:Math.floor(d()*y.length)})}y.forEach((i,a)=>{let u=b.filter(e=>e.piece===a);if(!u.length)return;i.material.roughness=1,i.material.userData.clear||(i.material.userData.clear=!0,Hs(i.material,`stage-rock-clear`));let d=new ve(i.geometry,i.material,u.length),f=Gs(i.geometry);u.forEach((t,i)=>{s.setFromAxisAngle(Ws,t.yaw);let a=n.heightAt(t.x,t.z)-t.scale*.1;o.compose(c.set(t.x,a,t.z),s,l.setScalar(t.scale)),d.setMatrixAt(i,o),r(e.ColliderDesc.convexHull(new Float32Array(f.map(e=>e*t.scale))).setTranslation(t.x,a,t.z).setRotation(s))}),d.castShadow=!0,d.receiveShadow=!0,d.frustumCulled=!1,t.add(d)});let S=new Ot({color:`#d9d4c7`,roughness:.8}),C=new Ot({color:`#e0471c`,roughness:.6}),w=new Et(.03,.035,1.1,5).translate(0,.55,0),T=new Et(.036,.036,.26,5).translate(0,1,0),E=[];for(let e=30;e<a.length-30;e+=16){let t=a[e];for(let e of[-1,1])E.push({x:t.x+t.sx*e*(t.half+2.1),z:t.z+t.sz*e*(t.half+2.1)})}let D=new ve(w,S,E.length),O=new ve(T,C,E.length);E.forEach((e,t)=>{o.compose(c.set(e.x,n.heightAt(e.x,e.z)-.04,e.z),s.identity(),l.setScalar(1)),D.setMatrixAt(t,o),O.setMatrixAt(t,o)});for(let e of[D,O])e.frustumCulled=!1,e.castShadow=!0,t.add(e);E.forEach((e,t)=>h(e.x,e.z,.1,[D,t],[O,t]));let k=[],ee=-100;for(let e=20;e<a.length-20;e++){let t=a[e];if(Math.abs(t.bend)<.03||e-ee<22)continue;ee=e;let n=a[Math.min(a.length-1,e+8)],r=t.bend>0?-1:1;for(let t of[0,8,16]){let i=a[Math.min(a.length-1,e+t)];k.push({x:i.x+i.sx*r*(i.half+2.8),z:i.z+i.sz*r*(i.half+2.8),yaw:Math.atan2(-n.dx,-n.dz),flip:r<0})}}let A=new Ot({map:Ks(),roughness:.6}),te=new ce(1.5,.75).translate(0,1.15,0),j=new ve(te,A,k.length),ne=new ot(.07,1.1,.05).translate(0,.45,0),M=new ve(ne,S,k.length);k.forEach((e,t)=>{s.setFromAxisAngle(Ws,e.yaw),o.compose(c.set(e.x,n.heightAt(e.x,e.z)-.05,e.z),s,l.set(e.flip?-1:1,1,1)),j.setMatrixAt(t,o),M.setMatrixAt(t,o),h(e.x,e.z,.8,[j,t],[M,t])}),A.side=2;for(let e of[j,M])e.frustumCulled=!1,e.castShadow=!0,t.add(e);let N=_t,P=new Ot({color:`#2a3238`,roughness:.55,metalness:.5}),re=ft(46,0),ie=ft(46,1),ae=ie.x-re.x,oe=ie.z-re.z,se=10.5;for(let n of[-1,1]){let i=new Mt(new ot(.42,7.4,.42).translate(0,3.7,0),P);i.position.set(re.x+ae*n*se,0,re.z+oe*n*se),i.rotation.y=N,i.castShadow=!0,t.add(i),r(e.ColliderDesc.cuboid(.21,3.7,.21).setTranslation(i.position.x,3.7,i.position.z))}let F=new Ot({map:qs(),roughness:.7}),I=new Mt(new ot(21.42,2.6,.22),[P,P,P,P,F,F]);return I.position.set(re.x,6.1,re.z),I.rotation.y=N,I.castShadow=!0,t.add(I),{update(e,t){let n=e.object,r=n.getWorldDirection(_),i=e.size.length/2,a=e.size.width/2,o=Math.floor((n.position.x+Z)/8),s=Math.floor((n.position.z+Z)/8);for(let e=o-1;e<=o+1;e++)for(let o=s-1;o<=s+1;o++){let s=f.get(e<<12|o);if(s)for(let e of s){if(e.kept.length||Math.abs(e.y-n.position.y)>3)continue;let o=e.x-n.position.x,s=e.z-n.position.z,c=o*r.x+s*r.z,l=o*r.z-s*r.x;if(!(Math.abs(c)>i+e.reach||Math.abs(l)>a+e.reach)){for(let[t,n]of e.parts){let r=new Tt;t.getMatrixAt(n,r),e.kept.push(r),t.setMatrixAt(n,g),t.instanceMatrix.needsUpdate=!0}p.push(e),t(e)}}}},reset(){for(let e of p)e.parts.forEach(([t,n],r)=>{t.setMatrixAt(n,e.kept[r]),t.instanceMatrix.needsUpdate=!0}),e.kept=[];p.length=0},standing(){let e=[...f.values()].flat(),t=({x:e,z:t})=>({x:e,z:t});return{poles:e.filter(e=>e.reach<.5).map(t),boards:e.filter(e=>e.reach>=.5).map(t),rocks:b.filter(e=>e.scale>.45).map(t)}}}}var Ys=(function(){let e=typeof document<`u`&&document.createElement(`link`).relList;return e&&e.supports&&e.supports(`modulepreload`)?`modulepreload`:`preload`})(),Xs=function(e,t){return new URL(e,t).href},Zs={},Qs=function(e){return e.pathname.endsWith(`.css`)},$s=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},ec=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Xs(t,n);let r=s(t),i=Qs(r);return $s(Zs,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Ys,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},tc=10,nc=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function rc(e,t,n){let r=new Ot({roughness:.95,metalness:0});return r.onBeforeCompile=r=>{Object.assign(r.uniforms,{tSplat:{value:t},tGrass:{value:e.grass},tForest:{value:e.forest},tRock:{value:e.rock},tGravel:{value:e.gravel},nGrass:{value:e.grassN},nForest:{value:e.forestN},nRock:{value:e.rockN},nGravel:{value:e.gravelN},landSpan:{value:Z*2}}),r.vertexShader=r.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vLand;
varying vec3 vLandNormal;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vLand = position;
vLandNormal = normal;`),r.fragmentShader=r.fragmentShader.replace(`#include <common>`,`#include <common>
				varying vec3 vLand;
				varying vec3 vLandNormal;
				uniform sampler2D tSplat, tGrass, tForest, tRock, tGravel, nGrass, nForest, nRock, nGravel;
				uniform float landSpan;
				vec4 landWeights;
				vec2 landUv;`).replace(`#include <map_fragment>`,`landUv = vLand.xz;
				vec4 sp = texture2D(tSplat, landUv / landSpan + 0.5);
				// Break the edges between grounds up with the grain of the ground itself.
				float grain = texture2D(tForest, landUv / 3.7).g;
				sp = max(sp + (grain - 0.42) * 0.55 * (sp * (1.0 - sp) * 4.0), vec4(0.0));
				landWeights = sp / max(sp.r + sp.g + sp.b + sp.a, 0.001);
				vec2 a = landUv / 4.3;
				vec2 b = landUv / 23.0;
				vec3 land = vec3(0.0);
				land += landWeights.r * mix(texture2D(tGrass, a).rgb, texture2D(tGrass, b).rgb, 0.45) * vec3(0.78, 1.0, 0.5);
				land += landWeights.g * mix(texture2D(tForest, a).rgb, texture2D(tForest, b).rgb, 0.4) * vec3(0.62, 0.68, 0.46);
				land += landWeights.b * mix(texture2D(tRock, a * 0.6).rgb, texture2D(tRock, b).rgb, 0.45);
				vec3 stone = mix(texture2D(tGravel, a).rgb, texture2D(tGravel, b).rgb, 0.4);
				land += landWeights.a * mix(stone, vec3(dot(stone, vec3(0.33))), 0.45) * 1.25;
				// Broad changes of colour across the land, seen from far.
				land *= 0.82 + 0.36 * texture2D(tGrass, landUv / 211.0).g;
				diffuseColor.rgb = land;`).replace(`#include <normal_fragment_maps>`,n?``:`{
					vec2 a = landUv / 4.3;
					vec2 detail = landWeights.r * (texture2D(nGrass, a).xy - 0.5) + landWeights.g * (texture2D(nForest, a).xy - 0.5) + landWeights.b * (texture2D(nRock, a * 0.6).xy - 0.5) + landWeights.a * (texture2D(nGravel, a).xy - 0.5);
					vec3 w = normalize(vLandNormal + vec3(detail.x, 0.0, -detail.y) * 1.2);
					normal = normalize((viewMatrix * vec4(w, 0.0)).xyz);
				}`)},r.customProgramCacheKey=()=>`stage-land${n?`-light`:``}`,r}function ic(e,t){let n=new Ot({roughness:.92,metalness:0,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});return n.onBeforeCompile=n=>{Object.assign(n.uniforms,{tGravel:{value:e.gravel},tAsphalt:{value:e.asphalt},nGravel:{value:e.gravelN},nAsphalt:{value:e.asphaltN}}),n.vertexShader=n.vertexShader.replace(`#include <common>`,`#include <common>
attribute vec4 aRoad;
varying vec4 vRoad;
varying vec3 vRoadNormal;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vRoad = aRoad;
vRoadNormal = normal;`),n.fragmentShader=n.fragmentShader.replace(`#include <common>`,`#include <common>
				varying vec4 vRoad; // metres across, metres along, half width, how sealed
				varying vec3 vRoadNormal;
				uniform sampler2D tGravel, tAsphalt, nGravel, nAsphalt;
				float roadSealed;
				vec2 roadUv;`).replace(`#include <map_fragment>`,`roadUv = vec2(vRoad.x, vRoad.y) / 4.3;
				float across = abs(vRoad.x);
				float edge = across / max(vRoad.z, 0.1);
				float wobble = texture2D(tGravel, vec2(vRoad.y / 37.0, 0.3)).g - 0.5;
				roadSealed = smoothstep(0.42, 0.58, vRoad.w + wobble * 0.5);
				// Loose: two pale worn lines where the wheels go, loose stone at the sides and down the middle.
				vec3 gravel = mix(texture2D(tGravel, roadUv).rgb, texture2D(tGravel, roadUv * 0.19).rgb, 0.4);
				gravel = mix(gravel, vec3(dot(gravel, vec3(0.33))), 0.45) * 1.25;
				float tracks = smoothstep(0.55, 0.0, abs(abs(vRoad.x + wobble * 0.5) - 1.05));
				gravel *= 1.0 + tracks * 0.18 - smoothstep(0.75, 1.0, edge) * 0.12;
				// Sealed: worn tarmac, a white line down each side, and dashes down the middle.
				vec3 tar = mix(texture2D(tAsphalt, roadUv).rgb, texture2D(tAsphalt, roadUv * 0.23).rgb, 0.45);
				float width = fwidth(vRoad.x);
				float lines = 1.0 - smoothstep(0.07, 0.07 + width, abs(across - (vRoad.z - 0.34)));
				float dash = (1.0 - smoothstep(0.05, 0.05 + width, across)) * step(fract(vRoad.y / 9.0), 0.42);
				tar = mix(tar, vec3(0.74, 0.72, 0.66), max(lines, dash) * 0.82 * smoothstep(0.0, 0.5, vRoad.z - across + 0.3));
				diffuseColor.rgb = mix(gravel, tar, roadSealed);`).replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
roughnessFactor = mix(0.96, 0.82, roadSealed);`).replace(`#include <normal_fragment_maps>`,t?``:`{
					vec2 detail = mix(texture2D(nGravel, roadUv).xy, texture2D(nAsphalt, roadUv).xy, roadSealed) - 0.5;
					vec3 w = normalize(mix(vRoadNormal, vec3(0.0, 1.0, 0.0), smoothstep(0.95, 1.1, abs(vRoad.x) / max(vRoad.z, 0.1))) + vec3(detail.x, 0.0, -detail.y) * 0.9);
					normal = normalize((viewMatrix * vec4(w, 0.0)).xyz);
				}`)},n.customProgramCacheKey=()=>`stage-road${t?`-light`:``}`,n}async function ac(e,t,n,r,{light:i=!1,renderer:a,progress:o=()=>{}}={}){let s=e,c=Ns(),l=new pe;l.name=`stage`,n.add(l);let d=new Set,f=e=>{let n=t.createCollider(e.setCollisionGroups(r.solid).setFriction(.6).setRestitution(.05));return d.add(n),n},p=e=>{d.delete(e),t.removeCollider(e,!1)},m=new b,h=async(e,t)=>{let n=await m.loadAsync(`stage/${e}.webp`);return n.wrapS=n.wrapT=ie,n.anisotropy=i?2:8,t&&(n.colorSpace=se),n},[g,_,v,y,S,C,T,E,D,O,k,A]=await Promise.all([h(`grass-diff`,!0),h(`grass-nor`),h(`forest-diff`,!0),h(`forest-nor`),h(`rock-diff`,!0),h(`rock-nor`),h(`gravel-diff`,!0),h(`gravel-nor`),h(`asphalt-diff`,!0),h(`asphalt-nor`),fetch(`stage/sky.json`).then(e=>e.json()),m.loadAsync(`stage/sky.webp`)]),te={grass:g,grassN:_,forest:v,forestN:y,rock:S,rockN:C,gravel:T,gravelN:E,asphalt:D,asphaltN:O};o(`지형 만드는 중`);let j=new Float32Array(251001);for(let e=0;e<501;e++)for(let t=0;t<501;t++)j[e+t*501]=c.heights[e*501+t];f(s.ColliderDesc.heightfield(500,500,j,{x:Z*2,y:1,z:Z*2}));for(let[e,t,n,r]of[[0,-Z,Z,2],[0,Z,Z,2],[-Z,0,2,Z],[Z,0,2,Z]])f(s.ColliderDesc.cuboid(n,200,r).setTranslation(e,0,t));let ne=1024,M=new Uint8Array(ne*ne*4);for(let e=0;e<ne;e++)for(let t=0;t<ne;t++){let n=(t+.5)/ne*Z*2-Z,r=(e+.5)/ne*Z*2-Z,i=c.slopeAt(n,r),a=c.distanceAt(n,r),o=c.woodAt(n,r),s=nc(.42,.62,i+(Es(n/26,r/26,2)-.5)*.3),l=nc(9,2,a-4)*.95;c.inYard(n,r)?(l=c.surfaceAt(n,r)===`grass`?0:1,s=0):l=Math.max(l,nc(26,4,c.outsideYard(n,r)));let u=(1-s)*(1-l),d=(e*ne+t)*4;M[d]=255*u*(1-o),M[d+1]=255*u*o,M[d+2]=255*s*(1-l),M[d+3]=255*l}let N=new u(M,ne,ne,ee);N.minFilter=Ae,N.magFilter=gt,N.wrapS=N.wrapT=Ct,N.generateMipmaps=!0,N.needsUpdate=!0,o(`지형 만드는 중`),await new Promise(e=>setTimeout(e));let P=rc(te,N,i),re=Math.floor(500/tc),ae=[],oe=(e,t)=>{let n=(e,t)=>c.heights[Math.max(0,Math.min(500,t))*501+Math.max(0,Math.min(500,e))];return new G(n(e-1,t)-n(e+1,t),8,n(e,t-1)-n(e,t+1)).normalize()},ce=(e,t)=>{let n=e+1,r=[];for(let i=0;i<e;i+=t)for(let a=0;a<e;a+=t){let e=i*n+a,o=i*n+a+t,s=(i+t)*n+a,c=(i+t)*n+a+t;r.push(e,s,o,o,s,c)}let i=n*n,a=[];for(let n=0;n<e;n+=t)a.push([n,0,n+t,0]);for(let n=0;n<e;n+=t)a.push([e,n,e,n+t]);for(let n=e;n>0;n-=t)a.push([n,e,n-t,e]);for(let n=e;n>0;n-=t)a.push([0,n,0,n-t]);let o=(t,r)=>r===0?i+t:t===e?i+n+r-1:r===e?i+n+e+(e-t)-1:i+n+e*2+(e-r)-1;for(let[e,t,i,s]of a){let a=t*n+e,c=s*n+i;r.push(a,c,o(e,t),c,o(i,s),o(e,t))}return r},F=re,I=[1,2,5].map(e=>new K(new Uint32Array(ce(F,e)),1));for(let e=0;e<tc;e++)for(let t=0;t<tc;t++){let n=F+1,r=n+F+F+F-1,i=n*n+r+1,a=new Float32Array(i*3),o=new Float32Array(i*3),s=(n,r,i,s)=>{let l=t*F+r,u=e*F+i;a[n*3]=l*4-Z,a[n*3+1]=c.heights[u*501+l]-s,a[n*3+2]=u*4-Z;let d=oe(l,u);o[n*3]=d.x,o[n*3+1]=d.y,o[n*3+2]=d.z};for(let e=0;e<n;e++)for(let t=0;t<n;t++)s(e*n+t,t,e,0);let u=n*n;for(let e=0;e<n;e++)s(u++,e,0,5);for(let e=1;e<=F;e++)s(u++,F,e,5);for(let e=F-1;e>=0;e--)s(u++,e,F,5);for(let e=F-1;e>0;e--)s(u++,0,e,5);let d=new K(a,3),f=new K(o,3),p=I.map(e=>{let t=new ze;t.setAttribute(`position`,d),t.setAttribute(`normal`,f),t.setIndex(e),t.computeBoundingSphere();let n=new Mt(t,P);return n.receiveShadow=!0,n.visible=!1,l.add(n),n});p[0].visible=!0,ae.push({x:(t+.5)*F*4-Z,z:(e+.5)*F*4-Z,levels:p,level:0})}o(`도로 만드는 중`),await new Promise(e=>setTimeout(e));let L=ic(te,i),le=c.road.points,ue=[-2,-1.25,-1,-.5,0,.5,1,1.25,2],de=e=>Math.abs(e)<=1?0:Math.abs(e)<1.5?.06:.55,R=ue.length,fe=new Float32Array(le.length*R*3),z=new Float32Array(le.length*R*4);le.forEach((e,t)=>{ue.forEach((n,r)=>{let i=n*e.half,a=(t*R+r)*3;fe[a]=e.x+e.sx*i,fe[a+1]=e.y+e.bank*Math.max(-e.half,Math.min(e.half,i))-de(n),fe[a+2]=e.z+e.sz*i;let o=(t*R+r)*4;z[o]=i,z[o+1]=e.s,z[o+2]=e.half,z[o+3]=e.sealed})});let me=[];for(let e=0;e<le.length-1;e++)for(let t=0;t<R-1;t++){let n=e*R+t;me.push(n,n+R,n+1,n+1,n+R,n+R+1)}let he=new ze;he.setAttribute(`position`,new K(fe,3)),he.setIndex(me),he.computeVertexNormals();let ge=he.getAttribute(`normal`);for(let e=0;e<le.length-1;e+=40){let t=Math.min(le.length-1,e+40),n=new ze,r=(t-e+1)*R;n.setAttribute(`position`,new K(fe.slice(e*R*3,e*R*3+r*3),3)),n.setAttribute(`normal`,new K(ge.array.slice(e*R*3,e*R*3+r*3),3)),n.setAttribute(`aRoad`,new K(z.slice(e*R*4,e*R*4+r*4),4));let i=[];for(let n=0;n<t-e;n++)for(let e=0;e<R-1;e++){let t=n*R+e;i.push(t,t+R,t+1,t+1,t+R,t+R+1)}n.setIndex(i),n.computeBoundingSphere();let a=new Mt(n,L);a.receiveShadow=!0,l.add(a)}f(s.ColliderDesc.trimesh(fe,new Uint32Array(me)));{let e=(e,t,n)=>{let r=new ze;r.setAttribute(`position`,new K(new Float32Array(e),3)),r.setAttribute(`normal`,new K(new Float32Array(e.length).map((e,t)=>+(t%3==1)),3)),r.setAttribute(`aRoad`,new K(new Float32Array(t),4)),r.setIndex(n),r.computeBoundingSphere();let i=new Mt(r,L);i.receiveShadow=!0,l.add(i)},{place:t}=await ec(async()=>{let{place:e}=await import(`./yard-DcsZ335f.js`);return{place:e}},__vite__mapDeps([0,1]),import.meta.url),n=[],r=[],i=[];for(let e=0;e<=28;e++){let i=-135+275*e/28;for(let e of[-8,0,8]){let a=t(i,e);n.push(a.x,.02,a.z),r.push(e,i,8,1)}}for(let e=0;e<28;e++)for(let t=0;t<2;t++){let n=e*3+t;i.push(n,n+1,n+3,n+1,n+4,n+3)}e(n,r,i);let a=t(62,30),o=[a.x,.02,a.z],s=[0,0,40,1],c=[];for(let e=0;e<48;e++){let t=e/48*Math.PI*2;o.push(a.x+Math.cos(t)*23,.02,a.z+Math.sin(t)*23),s.push(Math.cos(t)*23,Math.sin(t)*23,40,1),c.push(0,1+(e+1)%48,1+e)}e(o,s,c)}A.colorSpace=se,A.anisotropy=4;let _e=k.share,ve=new x(40,48,24,0,Math.PI*2,0,Math.PI*_e),ye=new Mt(ve,new Oe({map:A,side:1,depthWrite:!1,depthTest:!1,fog:!1,toneMapped:!1}));A.wrapS=ie,ye.renderOrder=-10,ye.frustumCulled=!1,l.add(ye);let be=new w;be.add(new Mt(new x(10,32,16,0,Math.PI*2,0,Math.PI*_e),new Oe({map:A,side:1,toneMapped:!1})));let xe=new Mt(new x(10,16,8,0,Math.PI*2,Math.PI*_e,Math.PI*(1-_e)),new Oe({color:`#4b4a33`,side:1,toneMapped:!1}));be.add(xe);let Se=new on(a),Ce=Se.fromScene(be,.01).texture;Se.dispose(),o(`나무 심는 중`),await new Promise(e=>setTimeout(e));let B=await Js({R:s,group:l,shape:c,solid:f,light:i}),V=await Us({R:s,group:l,shape:c,maps:{...te,splat:N},solid:f,unsolid:p,light:i,loader:m,renderer:a,sun:k.sun});o(`스테이지 만드는 중`);let we=new G,Te=0,Ee=e=>{for(let t of ae){let n=Math.hypot(t.x-e.position.x,t.z-e.position.z)-F*4/2,r=n<90?0:n<300?1:2;r!==t.level&&(t.levels[t.level].visible=!1,t.levels[r].visible=!0,t.level=r)}};return{name:`stage`,start:null,group:l,environment:Ce,environmentIntensity:.62,sun:new G(k.sun[0],k.sun[1],-k.sun[2]),sunColour:`#fff0dc`,sunIntensity:3.1,hemisphere:{sky:`#bcd0e6`,ground:`#6b6242`,intensity:.62},fog:{colour:`rgb(${k.horizon.map(e=>Math.round(e*255)).join(`,`)})`,near:260,far:1500},far:2600,bounds:Z,surfaceAt:c.surfaceAt,heightAt:(e,t)=>c.inYard(e,t)?0:c.heightAt(e,t),shape:c,setActive(e){l.visible=e;for(let t of d)t.setEnabled(e)},solidAround(e,t){V.solidAround(e,t)},update(e,t,n,r){ye.position.copy(t.getWorldPosition(we)),V.update(e,t,n),B.update(n,r),Te++%12==0&&Ee(t)},allPieces(){let e=[];return l.traverse(t=>{t.isMesh&&e.push(t)}),e},reset(){B.reset()},standing(){return{...B.standing(),trunks:V.standing().map(({x:e,z:t})=>({x:e,z:t}))}},lower(){V.lower()},kindOf(){},count:{chunks:ae.length}}}var oc=new URLSearchParams(location.search),sc=1/120,cc=1,lc=4,uc=8,dc=(e,t)=>e<<16|t,fc={solid:dc(cc,9),body:dc(cc,9),loose:dc(3,13),bumper:dc(lc,10),ragdoll:dc(uc,5),sensor:dc(3,5)},pc={start:performance.now()},mc=document.getElementById(`view`),hc=document.getElementById(`cover`),gc=Object.fromEntries(no.controls.map(e=>[e.id,e.default])),Q={...gc};oc.get(`view`)&&(gc.view=Q.view=oc.get(`view`)),oc.get(`map`)&&(gc.map=Q.map=oc.get(`map`));var _c=null,vc=!1,yc=performance.now(),bc=0,xc=null,Sc=to({...no,onSet(e,t){_c?.set(e,t)},onTrigger(e){e===`reset`&&_c?.reset()},onVisible(e){vc=!e,xc?.setVisible(e),e&&(yc=performance.now(),bc=0)}}),Cc=()=>new Promise(e=>setTimeout(e)),wc=document.getElementById(`loading`),Tc=(e,t)=>{wc&&t&&(wc.textContent=t+`…`),Sc.progress?.(e,t)};Tc(.05,`물리 엔진 불러오는 중`);var Ec=(await ec(async()=>{let{default:e}=await import(`./rapier.es-D5pTA3Hg.js`);return{default:e}},[],import.meta.url)).default;await Ec.init(),Tc(.2,`자동차 불러오는 중`);var Dc=Math.min(devicePixelRatio,1.5),Oc=new $i({canvas:mc,antialias:!0,powerPreference:`high-performance`});Oc.setPixelRatio(Dc),Oc.toneMapping=4,Oc.toneMappingExposure=.95,Oc.shadowMap.enabled=!0,Oc.shadowMap.type=1,Oc.debug.checkShaderErrors=!1,mc.addEventListener(`webglcontextlost`,e=>{e.preventDefault();let t=0;try{t=Number(sessionStorage.getItem(`car-lost`))||0,sessionStorage.setItem(`car-lost`,String(Date.now()))}catch{}Date.now()-t>6e4?location.reload():document.getElementById(`lost`).hidden=!1});var kc=new w;kc.fog=new i(`#e7bd8d`,170,620);var Ac=38,jc=.5,Mc=new M(Ac,1,jc,1400),Nc=new w;Nc.add(new Mt(new x(10,24,12),new te({side:1,depthWrite:!1,vertexShader:`varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`varying vec3 vDir;
				void main() {
					float h = vDir.y;
					vec3 ground = vec3(0.3, 0.25, 0.18);
					vec3 low = vec3(0.86, 0.68, 0.5);
					vec3 top = vec3(0.3, 0.45, 0.68);
					vec3 c = mix(low, top, smoothstep(0.0, 0.55, h));
					c = mix(ground, c, smoothstep(-0.02, 0.02, h));
					gl_FragColor = vec4(c, 1.0);
				}`})));var Pc=new on(Oc);kc.environment=Pc.fromScene(Nc,.02).texture,kc.environmentIntensity=.55,Pc.dispose();var Fc=new y(`#c6d8ea`,`#8d6a42`,.75);kc.add(Fc);var Ic=new ne(`#ffd3a0`,3.1);Ic.castShadow=!0,Ic.shadow.mapSize.set(2048,2048);var Lc=46;Object.assign(Ic.shadow.camera,{left:-46,right:Lc,top:Lc,bottom:-46,near:1,far:280}),Ic.shadow.bias=-4e-4,Ic.shadow.normalBias=.05,kc.add(Ic,Ic.target);var Rc={x:-70,y:74,z:44},zc=new pe;kc.add(zc),zc.add(new Mt(new x(1200,24,12),new te({side:1,depthWrite:!1,fog:!1,vertexShader:`varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`varying vec3 vDir;
				void main() {
					float h = clamp(vDir.y, 0.0, 1.0);
					vec3 low = vec3(0.905, 0.741, 0.553);
					vec3 mid = vec3(0.86, 0.72, 0.68);
					vec3 top = vec3(0.42, 0.56, 0.72);
					vec3 c = mix(low, mid, smoothstep(0.0, 0.12, h));
					c = mix(c, top, smoothstep(0.08, 0.6, h));
					gl_FragColor = vec4(c, 1.0);
					#include <colorspace_fragment>
				}`})));var Bc=new Ec.World({x:0,y:-9.81,z:0});Bc.timestep=sc;var Vc=new Ec.EventQueue(!0),Hc=new na,Uc=Oc.getContext(),Wc=Uc.getExtension(`WEBGL_debug_renderer_info`),Gc=Wc?Uc.getParameter(Wc.UNMASKED_RENDERER_WEBGL):``,Kc=oc.has(`light`)||/intel|swiftshader|llvmpipe|software|basic render|mali|adreno|powervr/i.test(Gc),[qc,Jc]=await Promise.all([`models/mannequin.glb`,Kc?jo.light:jo.file].map(e=>Hc.loadAsync(e)));Tc(.5,`야드 만드는 중`),await Cc();var Yc=et(Ec,Bc,kc,fc);Tc(.52,`스테이지 만드는 중`),await Cc();var Xc=await ac(Ec,Bc,kc,fc,{light:Kc,renderer:Oc,progress:e=>Tc(.56,e)});await Cc();var Zc={environment:kc.environment,environmentIntensity:kc.environmentIntensity,sun:new G(Rc.x,Rc.y,Rc.z).normalize(),sunColour:Ic.color.getStyle(),sunIntensity:Ic.intensity,hemisphere:{sky:`#c6d8ea`,ground:`#8d6a42`,intensity:.75},fog:{colour:`#e7bd8d`,near:170,far:620},far:1400},Qc=Yc,$c=Zc;function el(){let e=Q.map!==`yard`;Qc=e?Xc:Yc,$c=e?Xc:Zc,Yc.setActive(!e),Xc.setActive(e),zc.visible=!e,kc.environment=$c.environment,kc.environmentIntensity=$c.environmentIntensity,Ic.color.setStyle($c.sunColour),Ic.intensity=$c.sunIntensity,Fc.color.set($c.hemisphere.sky),Fc.groundColor.set($c.hemisphere.ground),Fc.intensity=$c.hemisphere.intensity,kc.fog.color.set($c.fog.colour),kc.fog.near=$c.fog.near,kc.fog.far=$c.fog.far,Mc.far=$c.far,Mc.updateProjectionMatrix(),al.heightAt=Qc.heightAt,pl&&(pl.groundAt=Qc.heightAt)}xc=new $o,await xc.load().catch(()=>{});var tl=()=>xc.start();addEventListener(`pointerdown`,tl),addEventListener(`keydown`,tl);var nl=Jo(qc),rl=[[16,-11,`idle`,2.2],[21,11,`fold`,3.6],[22,10,`talk`,-1.2],[32,-13,`idle`,.4],[52,-12,`talk`,1],[53,-13,`fold`,4],[-15,-11,`idle`,.5],[38,13,`fold`,2]].map(([e,t,n,r],i)=>new Yo(Ec,Bc,nl,{position:ft(e,t),yaw:_t+r,clip:n,groups:{ragdoll:fc.ragdoll,sensor:fc.sensor},phase:i*.37}));for(let e of rl)kc.add(e.mesh);var il=new Map(rl.map(e=>[e.sensor.handle,e])),al=new Ro(kc),ol={x:0,y:.06,z:0},sl=.12,cl=Po(Jc.scene,{value:sl}),ll=So(Jc.scene),ul={wheels:ll.wheels.map((e,t)=>({...e,index:t,ride:0,length:0,angle:0,steerAngle:0})),position:ol,quaternion:{x:0,y:0,z:0,w:1}},dl=new Ao(Jc.scene,ul,{...jo.travelDrawn,wheelTurn:jo.wheelTurn,wheelAxis:jo.wheelAxis,cabin:jo.cabin,cabinGlow:jo.cabinGlow});kc.add(dl.object);var fl=null,pl=null,ml=null,hl=e=>{let t=e?.linvel();return t?Math.hypot(t.x,t.y,t.z):0},$=new po(Ec,Bc,{...Mo(),wheels:ll.wheels,size:jo.bodySize??ll.size,position:ol,yaw:_t,groups:{body:fc.body,bumper:fc.bumper},surfaceAt:(e,t)=>Qc.surfaceAt(e,t)});$.base={...$.tune,hertz:[...$.tune.hertz]},$.on(`stuck`,()=>$.flip()),$.on(`land`,e=>{e<1.5||(xc.play(`land`,Math.min(1,e/7),1,1-Q.slow*.75),e<3||al.burst($.position.x,$.position.y+.3,$.position.z,Math.min(14,Math.floor(e*1.5)),2+e*.3,1.6,Qc.surfaceAt($.position.x,$.position.z)))}),$.on(`shift`,()=>{let e=.35+$.input.throttle*.35;xc.play(`gear`,e,1,1-Q.slow*.75)}),xc.useEngine(jo.engine),gl(),dl.attach($);function gl(){let e=$.base;$.tune.assists=Q.assists,$.tune.gripScale=Q.grip,$.tune.hertz=e.hertz.map(e=>e*Q.stiffness),$.tune.torque=e.torque*Q.power,$.tune.frontDrive=Q.drive<0?e.frontDrive:Q.drive,$.tune.lock=e.lock*Q.lock,$.flipWait=Q.flip_wait,$.applyTune()}function _l(){$.moveTo(ol,_t),dl.attach($),fl.jump($),al.reset()}function vl(){let e=dl.eye;Q.view===`driver`&&!e&&(Q.view=`chase`,Sc.state({...Q}));let t=Q.view===`driver`;dl.showInside(t),xc.setInside(t),al.clearAround=t,t?ml.seat(dl,e):fl===ml&&pl.jump($),fl=t?ml:pl,Mc.near=t?ts:jc,Mc.fov=t?62:Ac,Mc.updateProjectionMatrix()}var yl=()=>{};function bl(){let e=Q.map;Object.assign(Q,gc),e!==Q.map&&el(),gl(),Sc.state({...Q}),Yc.reset(),Xc.reset();for(let e of rl)e.reset();Vc.clear(),ml.reset(),pl.reset($),vl(),_l(),cl.value=sl,fl.glideIn(),yl()}var xl=new Set,Sl=e=>e.code===`Space`?`space`:e.code===`ArrowUp`?`w`:e.code===`ArrowDown`?`s`:e.code===`ArrowLeft`?`a`:e.code===`ArrowRight`?`d`:/^Key[A-Z]$/.test(e.code)?e.code[3].toLowerCase():null,Cl=document.getElementById(`keys`),wl=(e,t)=>Cl.querySelector(`[data-k="${e}"]`)?.classList.toggle(`down`,t);addEventListener(`keydown`,e=>{let t=Sl(e);!t||e.ctrlKey||e.metaKey||e.altKey||([`w`,`a`,`s`,`d`,`space`,`r`,`v`].includes(t)&&e.preventDefault(),e.repeat||(xl.add(t),wl(t,!0),t===`r`&&_c&&bl(),t===`v`&&_c&&(_c.set(`view`,Q.view===`driver`?`chase`:`driver`),Sc.state({...Q}))))}),addEventListener(`keyup`,e=>{let t=Sl(e);t&&(xl.delete(t),wl(t,!1))});var Tl=()=>{if(Cl.classList.toggle(`asleep`,!document.hasFocus()),!document.hasFocus()){for(let e of xl)wl(e,!1);xl.clear()}};addEventListener(`blur`,Tl),addEventListener(`focus`,Tl),Tl();var El=null;mc.addEventListener(`pointerdown`,e=>{mc.focus({preventScroll:!0}),El={x:e.clientX,y:e.clientY},mc.setPointerCapture(e.pointerId)}),mc.addEventListener(`pointermove`,e=>{El&&fl&&(fl.drag(e.clientX-El.x,e.clientY-El.y),El={x:e.clientX,y:e.clientY})}),mc.addEventListener(`pointerup`,()=>{El=null,fl?.release?.()}),mc.addEventListener(`wheel`,e=>{e.preventDefault(),fl?.scroll(e.deltaY)},{passive:!1}),mc.addEventListener(`contextmenu`,e=>e.preventDefault());var Dl=()=>{let e=innerWidth,t=innerHeight;Oc.setSize(e,t,!1),Mc.aspect=e/t,Mc.updateProjectionMatrix()};addEventListener(`resize`,Dl),Dl(),pl=fl=new Ss(Mc,$),pl.reset($),ml=new ys(Mc),el(),vl();function Ol(e,t,n){if(e.falling)return;let r=Math.min(7,.6+n*.2);if(e.fall({x:t.x*.8,y:t.y*.8+r,z:t.z*.8}),n>5){fl.kick(Math.min(.35,n*.012));let t=()=>(Math.random()-.5)*Math.min(10,n);e.shove({x:0,y:0,z:0},{x:t(),y:t(),z:t()});let r=e.mesh.position;al.burst(r.x,r.y+.3,r.z,4,2,1.1,Qc.surfaceAt(r.x,r.z))}}function kl(e){let t=Bc.getCollider(e.collider1()),n=Bc.getCollider(e.collider2()),r=t?.parent()?.handle===$.body.handle?n:t,i=r?.parent(),a=i&&Yc.kindOf(i);if(a)return a;let o=Ec.ShapeType;switch(r?.shape.type){case o.Cylinder:return`wood`;case o.ConvexPolyhedron:case o.HeightField:case o.TriMesh:return`rock`;default:return`metal`}}function Al(){let e=1-Q.slow*.75;Vc.drainCollisionEvents((t,n,r)=>{if(!r)return;let i=il.get(t)??il.get(n);if(i){if(i.falling)return;let r=Bc.getCollider(il.has(t)?n:t)?.parent();if(!r||!r.isDynamic())return;let a=hl(r);(r.handle===$.body.handle?a>1.5:a>3.5)&&(Ol(i,r.linvel(),a),xc.play(`figure`,Math.min(1,a/22),1,e));return}let a=Bc.getCollider(t)?.parent(),o=Bc.getCollider(n)?.parent(),s=Yc.kindOf(a)??Yc.kindOf(o);s&&xc.play(s,Math.abs(hl(a)-hl(o))/16,s===`wood`?.85:1,e)}),Vc.drainContactForceEvents(t=>{let n=t.maxForceMagnitude()/$.tune.mass,r=kl(t);if(n>6&&r!==`wood`&&xc.scrape(Math.min(1,n/60)),n<30)return;let i=Math.min(1,n/260);xc.play(r,i,1,e),r!==`metal`&&xc.play(`metal`,i*.55,.9,e),fl.kick(Math.min(.3,i*.4))})}var jl=()=>performance.now(),Ml=0;function Nl(){let e=sc*(1-Q.slow);Bc.timestep=e,$.input=_c?.script?_c.script($,e):{throttle:+!!xl.has(`w`),brake:+!!xl.has(`s`),steer:+!!xl.has(`a`)-!!xl.has(`d`),handbrake:+!!xl.has(`space`)},Qc===Xc&&Xc.solidAround($.position.x,$.position.z),$.update(e),Bc.step(Vc),$.afterStep(e),Al();for(let e of $.wheels)e.inContact&&e.dampSpeed>1&&jl()-Ml>260&&(Ml=jl(),xc.play(`thump`,Math.min(1,(e.dampSpeed-.6)/2),1,1-Q.slow*.75));return dl.stepped(),$.wheels[2].inContact&&$.wheels[2].surface!==`tarmac`&&(cl.value=Math.min(1,cl.value+Math.abs($.forwardSpeed)*e/450)),($.position.y<Qc.heightAt($.position.x,$.position.z)-8||Math.abs($.position.x)>Qc.bounds||Math.abs($.position.z)>Qc.bounds)&&$.moveTo(ol,_t),e}var Pl={tarmac:`아스팔트`,gravel:`자갈`,grass:`잔디`},Fl={speed:document.getElementById(`speed`),gear:document.getElementById(`gear`),surface:document.getElementById(`surface`),bars:[...document.querySelectorAll(`#springs i`)],tc:document.getElementById(`tc`),abs:document.getElementById(`abs`),next:0};function Il(e){e<Fl.next||(Fl.next=e+80,Fl.speed.textContent=String(Math.round(Math.abs($.forwardSpeed)*3.6)),Fl.gear.textContent=$.gear<0?`R`:String($.gear),Fl.surface.textContent=Pl[$.wheels[2].surface]??$.wheels[2].surface,$.wheels.forEach((e,t)=>{Fl.bars[t].style.transform=`scaleY(${Math.max(.03,Math.min(1,e.travelled)).toFixed(2)})`}),Fl.tc.classList.toggle(`on`,Q.assists&&$.tractionCut>.08),Fl.abs.classList.toggle(`on`,Q.assists&&$.input.brake>0&&$.wheels.some(e=>e.front&&e.slipRatio<-.13)))}function Ll(e){let t=$.speed;al.burst(e.x,e.y+.4,e.z,3,1.5+t*.1,.8,Qc.surfaceAt(e.x,e.z)),xc.play(`snap`,.35+Math.min(.65,t/30),1,1-Q.slow*.75)}function Rl(e,t,n,r){dl.update(t,n);for(let e of rl)e.update(t);Yc.update(t),Qc===Xc&&Xc.update(e,Mc,{object:dl.object,size:$.size},Ll),al.update($,t,Mc),xc.update($,e,1-Q.slow*.75),fl.update($,dl.object.position,e);let i=dl.object.position;Ic.target.position.set(i.x,i.y,i.z),Ic.position.set(i.x+$c.sun.x*110,i.y+$c.sun.y*110,i.z+$c.sun.z*110),Il(r),Oc.render(kc,Mc)}var zl=!1;function Bl(){Ic.shadow.mapSize.set(1024,1024),Ic.shadow.map?.dispose(),Ic.shadow.map=null,Oc.shadowMap.autoUpdate=!1,Oc.shadowMap.needsUpdate=!0,zl=!0,Yc.lower(),Xc.lower()}var Vl=0,Hl=0;function Ul(e){requestAnimationFrame(Ul);let t=e-yc,n=Math.min(.1,t/1e3);if(yc=e,vc||_c?.hold)return;bc+=n;let r=0,i=0;for(;bc>=sc&&r<8;)i+=Nl(),bc-=sc,r++;r===8&&(bc=0),Hl++,zl&&Hl%2==0&&(Oc.shadowMap.needsUpdate=!0),Rl(n,i,bc/sc,e),pc.ready&&(Vl=t>30?Vl+t:Math.max(0,Vl-t*3),Vl>5e3&&Dc>.75&&(Dc=Math.max(.75,Dc-.25),Oc.setPixelRatio(Dc),Dl(),Vl=0,pc.scaledDown=(pc.scaledDown??0)+1))}_c={world:Bc,RAPIER:Ec,stage:Xc,get land(){return Qc},get view(){return fl},yard:Yc,figures:rl,effects:al,dirt:cl,sounds:xc,camera:Mc,scene:kc,values:Q,held:xl,renderer:Oc,script:null,sounds:xc,stepWorld:Nl,lowest:Bl,reset:bl,get car(){return $},get model(){return dl},set(e,t){if(Q[e]!==t){if(Q[e]=t,e===`map`){el(),Yc.reset();for(let e of rl)e.reset();_l()}else e===`view`?vl():e!==`slow`&&gl()}}};var Wl={view:{label:`시점`,hint:`차 뒤에서 보거나 운전석에서 봅니다. 주행 중 V로 바꿉니다.`,options:{chase:`추적`,driver:`운전석`}},map:{label:`맵`,hint:`숲을 도는 랠리 스테이지 또는 낡은 야드.`,options:{stage:`스테이지`,yard:`야드`}},assists:{label:`주행 보조`,hint:`ABS, 트랙션 컨트롤, 스티어링 보조. 끄면 조향과 브레이크가 그대로 잠깁니다.`},grip:{label:`그립`,hint:`모든 노면에서 타이어가 버티는 정도. 1이 실제 타이어.`},stiffness:{label:`서스펜션`,hint:`스프링 강성. 낮으면 차체가 기울고 앞이 파묻히고, 높으면 평평하게 유지.`},slow:{label:`슬로우 모션`,hint:`차를 포함해 세상 전체가 느려집니다. 0은 정상 속도, 0.9는 1/10 속도.`},power:{label:`출력`,hint:`엔진 출력, 원래 차 대비 비율.`},drive:{label:`앞바퀴 구동`,hint:`앞바퀴로 가는 구동력: 0은 후륜 구동, 1은 전륜 구동. 0 미만이면 원래 차 설정.`},lock:{label:`조향각`,hint:`앞바퀴가 꺾이는 최대 각도, 원래 차 대비 비율.`},flip_wait:{label:`전복 후 복구`,hint:`지붕이나 옆면으로 뒤집힌 뒤 스스로 일어날 때까지의 시간.`,unit:`초`}};{let e=document.getElementById(`panel`),t=document.createElement(`div`);t.className=`box`,e.appendChild(t);let n=new Map,r=(e,t)=>{_c.set(e,t),Sc.state({...Q}),yl()};for(let e of no.controls){let i=Wl[e.id]??{label:e.label??e.id},a=document.createElement(`div`);a.className=`row`,e.essential||(a.dataset.adv=`1`),a.title=i.hint??e.hint??``;let o=document.createElement(`span`);if(o.className=`name`,o.textContent=i.label,a.appendChild(o),e.type===`choice`){let t=new Map;for(let n of e.options){let o=document.createElement(`button`);o.type=`button`,o.textContent=i.options?.[n.value]??n.label??n.value,o.addEventListener(`click`,()=>r(e.id,n.value)),t.set(n.value,o),a.appendChild(o)}n.set(e.id,{sync:()=>t.forEach((t,n)=>t.classList.toggle(`on`,Q[e.id]===n))})}else if(e.type===`toggle`){let t=document.createElement(`button`);t.type=`button`,t.addEventListener(`click`,()=>r(e.id,!Q[e.id])),a.appendChild(t),n.set(e.id,{sync:()=>{t.classList.toggle(`on`,!!Q[e.id]),t.textContent=Q[e.id]?`켜짐`:`꺼짐`}})}else if(e.type===`number`){let t=document.createElement(`input`);t.type=`range`,t.min=e.min,t.max=e.max,t.step=e.step;let o=document.createElement(`span`);o.className=`val`,t.addEventListener(`input`,()=>r(e.id,Number(t.value))),a.appendChild(t),a.appendChild(o),n.set(e.id,{sync:()=>{t.value=Q[e.id],o.textContent=e.id===`drive`&&Q[e.id]<0?`기본`:`${Q[e.id]}${i.unit??e.unit??``}`}})}t.appendChild(a)}let i=document.createElement(`div`);i.className=`row`;let a=document.createElement(`button`);a.type=`button`,a.className=`more`;let o=()=>{a.textContent=e.classList.contains(`adv`)?`세부 설정 접기`:`세부 설정 펼치기`};a.addEventListener(`click`,()=>{e.classList.toggle(`adv`),o()}),o();let s=[...t.querySelectorAll(`[data-adv]`)],c=document.createElement(`div`);c.id=`panel-adv`;for(let e of s)c.appendChild(e);let l=document.createElement(`button`);l.type=`button`,l.textContent=`리셋`,l.title=`처음으로: 모든 설정, 차, 상자, 마네킹, 시점이 돌아갑니다.`,l.addEventListener(`click`,()=>_c.reset()),i.appendChild(a),i.appendChild(l),t.appendChild(c),t.appendChild(i),yl=()=>n.forEach(e=>e.sync());let u=_c.set;_c.set=(e,t)=>{u(e,t),yl()},yl()}window.__block={app:_c,times:pc,renderer:Oc,block:Sc},Tc(.65,`야드 안정시키는 중`),await Cc();for(let e=0;e<120;e++)Nl();rl[0].fall({x:0,y:1,z:0});for(let e=0;e<8;e++)Nl();rl[0].update(sc),Tc(.75,`화면 준비하는 중`),await Cc();var Gl=Oc.getContext();Xc.group.visible=!0,Yc.group.visible=!0,zc.visible=!0;var Kl=Xc.allPieces(),ql=Kl.map(e=>[e,e.visible,e.frustumCulled]);for(let e of Kl)e.visible=!0,e.frustumCulled=!1;al.burst(0,.5,0,4,1,1,`gravel`),al.update($,sc,Mc),kc.traverse(e=>{let t=e.material;if(t)for(let e of[`map`,`normalMap`,`roughnessMap`,`metalnessMap`,`aoMap`,`emissiveMap`])t[e]&&Oc.initTexture(t[e])}),await Oc.compileAsync(kc,Mc),Tc(.88,`화면 준비하는 중`),await Cc(),Oc.render(kc,Mc),await Cc();for(let[e,t,n]of ql)e.visible=t,e.frustumCulled=n;el(),rl[0].reset(),Yc.reset(),al.reset(),Vc.clear(),$.moveTo(ol,_t);for(let e=0;e<180;e++)Nl();Yc.reset(),dl.attach($),pl.reset($),vl(),Rl(sc,sc,1,performance.now());var Jl=Gl.fenceSync(Gl.SYNC_GPU_COMMANDS_COMPLETE,0);Gl.flush(),await new Promise(e=>{let t=()=>{let n=Gl.clientWaitSync(Jl,0,0);n===Gl.ALREADY_SIGNALED||n===Gl.CONDITION_SATISFIED?e():setTimeout(t,8)};t()}),Gl.deleteSync(Jl),Tc(.96,`거의 다 됐습니다`),yc=performance.now(),bc=0,requestAnimationFrame(Ul),await new Promise(e=>requestAnimationFrame(e)),hc.remove(),await new Promise(e=>{let t=0,n=0,r=performance.now(),i=r,a=r,o=s=>{let c=s-r;if(r=s,t=c<26?t+1:0,t>=20||s-i>5500)return e();s-a>1500&&n<2&&(a=s,n++,pc.lowered=n,Dc=1,Oc.setPixelRatio(Dc),Dl(),n===2&&Bl()),requestAnimationFrame(o)};requestAnimationFrame(o)}),pc.ready=performance.now()-pc.start,Sc.ready();