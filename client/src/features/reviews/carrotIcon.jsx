import * as React from 'react';
import { SvgIcon as MuiSvgIcon, styled } from '@mui/material';

const SvgIcon = styled(MuiSvgIcon, {
    name: 'CarrotIcon',
    shouldForwardProp: (prop) => prop !== 'fill',
})(() => ({
    fill: 'orange',
    stroke: 'black',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2.25px',
}));

SvgIcon.defaultProps = {
    viewBox: '0 0 512 512',
    focusable: 'false',
    'aria-hidden': 'true',
};

const CarrotIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <path d="M349.098,177.61c0,10.64-0.939,24.69-2.629,40.879c-1.022,9.743-2.316,20.268-3.849,31.293  c-4.183,30.167-10.139,64.047-17.055,95.924c-0.855,3.922-1.742,7.917-2.66,11.975c-2.326,10.191-4.871,20.737-7.646,31.293  c-12.215,46.554-28.644,93.504-48.4,112.552L256,512l-10.859-10.473c-26.015-25.087-46.283-98.584-58.706-155.82  c-2.243-10.348-4.391-20.914-6.394-31.491c-2.003-10.483-3.87-20.977-5.591-31.293c-5.059-30.407-8.783-59.301-10.504-81.78  c-0.678-8.96-1.043-16.909-1.043-23.533c0-2.67,0.083-5.257,0.24-7.761c2.128-33.818,18.014-53.084,31.491-63.452  c15.511-11.954,30.98-14.697,32.701-14.969l1.22-0.198h54.888l1.22,0.198c1.721,0.271,17.19,3.015,32.701,14.969  C331.845,117.538,349.098,138.942,349.098,177.61z" />
            <path d="M251.5,93.5L236,93.5L236,56L276,56L276,93.5L260.5,93.5" fill="green"  />
            <path d="M251.5,93.5L236,93.5L236,56L276,56L276,93.5L260.5,93.5" fill="green" />
            <rect x="302.5" y="243.5" width="20" height="10" fill="lightorange" transform="rotate(45 312.5 248)" />
            <rect x="302.5" y="271.5" width="20" height="10" fill="lightorange" transform="rotate(-45 312.5 276)" />
            <rect x="202.5" y="319.5" width="20" height="10" fill="lightorange" transform="rotate(45 212.5 324)" />
            <rect x="202.5" y="347.5" width="20" height="10" fill="lightorange" transform="rotate(-45 212.5 352)" />
        </SvgIcon>
    );
};

export default CarrotIcon;
