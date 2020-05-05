const Flavours = [{
        name: "Jupyter Basic",
        type: "jupyter",
        cpu: "16",
        gpu: "0"
    }, {
        name: "Jupyter Gpu",
        type: "jupyter",
        cpu: "32",
        gpu: "4"
    },
    {
        name: "VM Basic",
        type: "vm",
        cpu: "16",
        gpu: "0"
    }, {
        name: "VM GPU",
        type: "vm",
        cpu: "32",
        gpu: "32"

    }
];

const Instances = [{
        name: "Jupyter 1",
        flavour: Flavours[1],
        description: "my jupyter environment",
        user: {}
    },
    {
        name: "VM 1",
        flavour: Flavours[2],
        description: "my virtual machine",
        user: {}
    }
]

const Datasets = [{
        title: "Unusual tera-magnetic wave",
        isPublic: true,
        size: 314,
        creationDate: "2020-01-25",
        instrument: {
            name: "Cool Thingy",
            facility: "ELI Beamlines"
        },
        technique: "Guess & See"
    },
    {
        title: "The gravimetric charge imbalance",
        isPublic: true,
        size: 1201,
        creationDate: "2020-01-25",
        instrument: {
            name: "Cool Thingy",
            facility: "ELI Beamlines"
        },
        technique: "Measure & Chill"
    },
    {
        title: "Magnetic anomaly in the gluon wave splitter",
        isPublic: true,
        size: 5043,
        creationDate: "2019-03-05",
        instrument: {
            name: "Expensive Machinery",
            facility: "EU XFEL"
        },
        technique: "Multi-spacial ghost detection"
    },
    {
        title: "Electromagnetic pathways to the sonic plasma feed",
        isPublic: true,
        size: 8989,
        creationDate: "2020-02-11",
        instrument: {
            name: "Hyperspace vortex manipulator",
            facility: "USS Mighty Mekong"
        },
        technique: "Unstable singularity transport"
    }
]

const Documents = [{
        title: "Time-resolvent spectroscopy - run 1-52",
        img: "/thumbnails/5e6/8d4697a40e308dccc1b4389a34e841a8c64dd.jpg",
        summary: "RP4-SRS focuses on time-resolvent spectroscopy experiments in the full range of frequencies from IR to UV. Users can measure samples as varied as solid state crystals, or proteins in their natural environment. Time-resolved spectroscopy is the collection of techniques that are used to examined the dynamic processes of materials and chemicals upon illumination with a pulsed laser.",
        datasets: [],
        members: [{
                name: "Dr. Who",
                affiliation: "TARDIS",
                role: "Time Lord",
            },
            {
                name: "Dana Scully, M.D.",
                affiliation: "X-Files",
                role: "Agent"
            }
        ],
        doi: "10.9563/if.2015.87.012",
        citation: "Dana Scully; (2020), Re-polarization of the aft quantum plasma collector, DOI:10.9563/if.2015.87.012",
        isPublic: true,
        type: "Proposal",
        startDate: "2017-09-11",
        endDate: "2019-03-21",
        releaseDate: "2020-01-01",
        licence: "MIT",
        keywords: [
            "nadion thrust assembly",
            "deuterium flow regulator",
            "auxiliary coffee dispenser",
            "antelope tank"
        ]
    },
    {
        title: "Two-color XUV+NIR femtosecond photoionization of neon in the near-threshold region",
        img: "/thumbnails/11b/248776e31b0904b110757f90835aa63b3c519.jpg",
        summary: "RP4-SRS focuses on time-resolvent spectroscopy experiments in the full range of frequencies from IR to UV. Users can measure samples as varied as solid state crystals, or proteins in their natural environment. Time-resolved spectroscopy is the collection of techniques that are used to examined the dynamic processes.",
        datasets: [],
        members: [{
                name: "Dr. Who",
                affiliation: "TARDIS",
                role: "Time Lord"
            },
            {
                name: "Dana Scully, M.D.",
                affiliation: "X-Files",
                role: "Agent"
            }
        ],
        doi: "10.9563/if.2015.87.012",
        citation: "Dana Scully; (2020), Re-polarization of the aft quantum plasma collector, DOI:10.9563/if.2015.87.012",
        isPublic: true,
        type: "Proposal",
        startDate: "2017-09-11",
        endDate: "2019-03-21",
        releaseDate: "2020-01-01",
        licence: "MIT",
        keywords: [
            "nadion thrust assembly",
            "deuterium flow regulator",
            "auxiliary coffee dispenser",
            "antelope tank"
        ]
    },
    {
        title: "Laser-driven Ion Acceleration from Plastic Target",
        img: "/thumbnails/9db/238d13927bb1f871e1f55ff6d3cd6a4abf042.jpg",
        summary: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Fenim ad minim veniam, quis nostrud exerci tationull.",
        datasets: [],
        members: [{
                name: "Dr. Who",
                affiliation: "TARDIS",
                role: "Time Lord"
            },
            {
                name: "Dana Scully, M.D.",
                affiliation: "X-Files",
                role: "Agent"
            }
        ],
        doi: "10.9563/if.2015.87.012",
        citation: "Dana Scully; (2020), Re-polarization of the aft quantum plasma collector, DOI:10.9563/if.2015.87.012",
        isPublic: true,
        type: "Proposal",
        startDate: "2017-09-11",
        endDate: "2019-03-21",
        releaseDate: "2020-01-01",
        licence: "MIT",
        keywords: [
            "nadion thrust assembly",
            "deuterium flow regulator",
            "auxiliary coffee dispenser",
            "antelope tank"
        ]
    },
    {
        title: "Electron-positron pair generation",
        img: "/thumbnails/b47/c6438bf808b708e4cde4f31767876276598da.jpg",
        summary: "OSIRIS 2D PIC simulation of gamma radiation and electron-positron pair production in a head-on collision of ultra-intense laser pulse (2.5 x 1023 W/cm2, 150 fs) with 3.9 GeV electron beam previously accelerated within the plasma channel.",
        datasets: [],
        members: [{
                name: "Dr. Who",
                affiliation: "TARDIS",
                role: "Time Lord"
            },
            {
                name: "Dana Scully, M.D.",
                affiliation: "X-Files",
                role: "Agent"
            }
        ],
        doi: "10.9563/if.2015.87.012",
        citation: "Dana Scully; (2020), Re-polarization of the aft quantum plasma collector, DOI:10.9563/if.2015.87.012",
        isPublic: true,
        type: "Proposal",
        startDate: "2017-09-11",
        endDate: "2019-03-21",
        releaseDate: "2020-01-01",
        licence: "MIT",
        keywords: [
            "nadion thrust assembly",
            "deuterium flow regulator",
            "auxiliary coffee dispenser",
            "antelope tank"
        ]
    },
    {
        title: "Generation of collimated quasi-monoenergetic proton beam",
        img: "/thumbnails/60c/16937829da15594f5fcb09c843d4d09ca8a12.jpg",
        summary: "2D particle-in-cell simulation of the interaction of high-intensity laser pulse (parameters are relevant to 100 PW class laser) with a double layer deuterium-hydrogen target. The laser pulse initiates instability on the interface between deuterium (blue) and proton (purple to yellow) layers. It results in generation of collimated quasi-monoenergetic proton bunch of high energy (yellow). The bunch can be also recognized in the proton energy spectra near the end of the simulation.",
        datasets: [],
        members: [{
                name: "Dr. Who",
                affiliation: "TARDIS",
                role: "Time Lord"
            },
            {
                name: "Dana Scully, M.D.",
                affiliation: "X-Files",
                role: "Agent"
            }
        ],
        doi: "10.9563/if.2015.87.012",
        citation: "Dana Scully; (2020), Re-polarization of the aft quantum plasma collector, DOI:10.9563/if.2015.87.012",
        isPublic: true,
        type: "Proposal",
        startDate: "2017-09-11",
        endDate: "2019-03-21",
        releaseDate: "2020-01-01",
        licence: "MIT",
        keywords: [
            "nadion thrust assembly",
            "deuterium flow regulator",
            "auxiliary coffee dispenser",
            "antelope tank"
        ]
    },
    {
        title: "Neutron Star Plasma Environment",
        img: "/thumbnails/667/00a08c1c8f05709cb1b2c4f67b65ffb8fcdb2.jpg",
        summary: "Extremely compact astronomical objects such as neutron stars are surrounded by plasmas of electrons and positrons embedded in extreme magnetic fields. This simulation shows the production of a plasma of electrons and positrons (blue-violet dots) in the extremely intense magnetic field (white lines) of a neutron star. The plasma strongly interacts with the field, twisting and stretching it.",
        datasets: [],
        members: [{
                name: "Dr. Who",
                affiliation: "TARDIS",
                role: "Time Lord"
            },
            {
                name: "Dana Scully, M.D.",
                affiliation: "X-Files",
                role: "Agent"
            }
        ],
        doi: "10.9563/if.2015.87.012",
        citation: "Dana Scully; (2020), Re-polarization of the aft quantum plasma collector, DOI:10.9563/if.2015.87.012",
        isPublic: true,
        type: "Proposal",
        startDate: "2017-09-11",
        endDate: "2019-03-21",
        releaseDate: "2020-01-01",
        licence: "MIT",
        keywords: [
            "nadion thrust assembly",
            "deuterium flow regulator",
            "auxiliary coffee dispenser",
            "antelope tank"
        ]
    },
    {
        title: "Laser Produced Gamma Rays",
        img: "/thumbnails/c81/53d44cd0fc3ff2177f1e9237c31f110a7b552.jpg",
        summary: "Electrons accelerated from a thin foil irradiated by an ultra-intense laser pulse emit energetic photons in the gamma region. The pulse rips electrons out of the initially solid target into the free space in front of it. While the laser pulse still burns through the target, the fast electrons interact with its strong electromagnetic field, producing energetic photons through the process of quantum radiation reaction - a peculiar kind of self-force stemming from higher-order corrections to the Lorentz force only observable in the presence of extremely strong electromagnetic fields, such as those of produced by the ELI lasers. Aenean bibendum ut lectus dictum mattis. Donec interdum nulla ut magna interdum maximus. Vestibulum vel cursus justo. Aliquam molestie, augue eget efficitur consectetur, tellus lacus commodo dolor, in pharetra orci sem a turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae lobortis leo, in eleifend purus. Donec condimentum lorem eget placerat bibendum.      Nullam blandit metus quis bibendum fringilla. Ut tristique, mi ac mollis gravida, augue leo vestibulum est, eu scelerisque nibh odio vitae augue. Nunc varius augue est, ultrices dictum sem elementum ut. Etiam purus massa, ullamcorper sit amet cursus quis, ultrices et risus. Suspendisse non velit eget felis mattis aliquam. Vivamus porttitor tempor elit id auctor. Aliquam sollicitudin augue ac consequat pulvinar. Donec dictum ante sit amet tellus ullamcorper sagittis. Suspendisse eu scelerisque dolor, eu fermentum odio.",
        datasets: [],
        members: [{
                name: "Dr. Who",
                affiliation: "TARDIS",
                role: "Time Lord"
            },
            {
                name: "Dana Scully, M.D.",
                affiliation: "X-Files",
                role: "Agent"
            }
        ],
        doi: "10.9563/if.2015.87.012",
        citation: "Dana Scully; (2020), Re-polarization of the aft quantum plasma collector, DOI:10.9563/if.2015.87.012",
        isPublic: true,
        type: "Proposal",
        startDate: "2017-09-11",
        endDate: "2019-03-21",
        releaseDate: "2020-01-01",
        licence: "MIT",
        keywords: [
            "nadion thrust assembly",
            "deuterium flow regulator",
            "auxiliary coffee dispenser",
            "antelope tank"
        ]
    },
    {
        title: "Magnetic Field Turbulence Generation in Astrophysical Plasma",
        img: "/thumbnails/ea9/20cf8ee7752735941bc555c7d1f58cd9f56dd.jpg",
        summary: "Plasma represents the most diffuse state of matter in the Universe, from the inside of our Sun to the structures that orbit around black holes. The dynamic of the plasma is strongly connected with the dynamic of the engaged magnetic field, such as you cannot fully understand the former without understanding the latter. Here, you can experience the evolution of the magnetic field, represented by these filaments. Instabilities grow inside the plasma (not shown) to modify the shape and the strength of the magnetic field. Something arises from what was uniform and ordinate once: Turbulence",
        datasets: [],
        members: [{
                name: "Dr. Who",
                affiliation: "TARDIS",
                role: "Time Lord"
            },
            {
                name: "Dana Scully, M.D.",
                affiliation: "X-Files",
                role: "Agent"
            }
        ],
        doi: "10.9563/if.2015.87.012",
        citation: "Dana Scully; (2020), Re-polarization of the aft quantum plasma collector, DOI:10.9563/if.2015.87.012",
        isPublic: true,
        type: "Proposal",
        startDate: "2017-09-11",
        endDate: "2019-03-21",
        releaseDate: "2020-01-01",
        licence: "MIT",
        keywords: [
            "nadion thrust assembly",
            "deuterium flow regulator",
            "auxiliary coffee dispenser",
            "antelope tank"
        ]
    },
    {
        title: "Laser-Driven Proton Acceleration from Cryogenic Hydrogen Target",
        img: "/thumbnails/434/cdc82906d5f5d67d105594849d0824e8ca84e.jpg",
        summary: "2D particle-in-cell simulation of the interaction of high-intensity laser pulse (parameters are relevant to L4 laser) with a cryogenic hydrogen target. Only protons with energy above 300 MeV at the end of the simulation are tracked and their position and energy are visualized. Two different groups of protons accelerated by different mechanisms can be distinguished from each other in space: Protons originated from the target interior and from the target rear side.",
        datasets: [],
        members: [{
                name: "Dr. Who",
                affiliation: "TARDIS",
                role: "Time Lord"
            },
            {
                name: "Dana Scully, M.D.",
                affiliation: "X-Files",
                role: "Agent"
            }
        ],
        doi: "10.9563/if.2015.87.012",
        citation: "Dana Scully; (2020), Re-polarization of the aft quantum plasma collector, DOI:10.9563/if.2015.87.012",
        isPublic: true,
        type: "Proposal",
        startDate: "2017-09-11",
        endDate: "2019-03-21",
        releaseDate: "2020-01-01",
        licence: "MIT",
        keywords: [
            "nadion thrust assembly",
            "deuterium flow regulator",
            "auxiliary coffee dispenser",
            "antelope tank"
        ]
    },
    {
        title: "Laser Produced Gamma Rays Trajectories",
        img: "/thumbnails/847/ad48a9a566e3c0d0058904a0281eba0e8388c.jpg",
        summary: "An obliquely incident laser pulse pulls out electrons from a solid target during a process called \"J x B heating\". Some of these electrons are re-accelerated into the target while others totter in the complex electromagnetic fields in front of it.",
        datasets: [],
        members: [{
                name: "Dr. Who",
                affiliation: "TARDIS",
                role: "Time Lord"
            },
            {
                name: "Dana Scully, M.D.",
                affiliation: "X-Files",
                role: "Agent"
            }
        ],
        doi: "10.9563/if.2015.87.012",
        citation: "Dana Scully; (2020), Re-polarization of the aft quantum plasma collector, DOI:10.9563/if.2015.87.012",
        isPublic: true,
        type: "Proposal",
        startDate: "2017-09-11",
        endDate: "2019-03-21",
        releaseDate: "2020-01-01",
        licence: "MIT",
        keywords: [
            "nadion thrust assembly",
            "deuterium flow regulator",
            "auxiliary coffee dispenser",
            "antelope tank"
        ]
    },
    {
        title: "Wake Wave Generation",
        img: "/thumbnails/0a4/fc903e0ef427c2cb141898ff0c2106ca137d2.jpg",
        summary: "This simulation represents intense laser beam focused on the rear side of the plasma target. Plasma is made of two types of particles - electrons and protons. In particle-in-cell simulations, we use macro-particles, where 1 macro-particle represents many real particles. Here you can see only electrons, protons are not interesting in this case since their weight is much higher (and therefore they do not move). Behind the laser pulse, plasma waves are excited (density spikes moving with the group velocity of the laser beam). Under certain conditions, electrons may be trapped inside the wave and accelerated (this is called laser-wakefield acceleration - LWFA).",
        datasets: [],
        members: [{
                name: "Dr. Who",
                affiliation: "TARDIS",
                role: "Time Lord"
            },
            {
                name: "Dana Scully, M.D.",
                affiliation: "X-Files",
                role: "Agent"
            }
        ],
        doi: "10.9563/if.2015.87.012",
        citation: "Dana Scully; (2020), Re-polarization of the aft quantum plasma collector, DOI:10.9563/if.2015.87.012",
        isPublic: true,
        type: "Proposal",
        startDate: "2017-09-11",
        endDate: "2019-03-21",
        releaseDate: "2020-01-01",
        licence: "MIT",
        keywords: [
            "nadion thrust assembly",
            "deuterium flow regulator",
            "auxiliary coffee dispenser",
            "antelope tank"
        ]
    }
]

const data = {
    Flavours,
    Instances,
    Datasets,
    Documents
}

export default data;