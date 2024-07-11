import Link from 'next/link';
import Image from 'next/image';
import React, { Fragment } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';

import Cookies from 'universal-cookie';
const cookies = new Cookies();


const LinkExpired = () => {


    const signupForm = () => {



        return (
            <div id="wrapper bg-white">


                <Head>
                    <title>Page Not Found</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="title" content='Page Not Found' />
                    <meta property="og:image" content="/icons/app_logo.png" />
                    <meta itemprop="image" content="/icons/app_logo.png"></meta>
                    <meta property="og:image:width" content="200" />
                    <meta property="og:image:height" content="200" />

                </Head>

                <div className="my-5 pt-sm-5">

                    <div className=" justify-center align-middle text-center ">
                        <a href="index.html">
                            <img src="/assets/notFound.png" alt="logo" height="45%" width="45%" />
                        </a>



                    </div>
                </div>






            </div >




        );
    }
    return <React.Fragment>
        {signupForm()}

    </React.Fragment>

};

export default LinkExpired;