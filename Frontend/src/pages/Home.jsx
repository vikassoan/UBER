import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
import api from '../utils/api';

const Home = () => {
    const [ pickup, setPickup ] = useState('')
    const [ destination, setDestination ] = useState('')
    const [ panelOpen, setPanelOpen ] = useState(false)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const [ vehiclePanel, setVehiclePanel ] = useState(false)
    const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)
    const [ vehicleFound, setVehicleFound ] = useState(false)
    const [ waitingForDriver, setWaitingForDriver ] = useState(false)
    const [ pickupSuggestions, setPickupSuggestions ] = useState([])
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
    const [ activeField, setActiveField ] = useState(null)
    const [ fare, setFare ] = useState({})
    const [ vehicleType, setVehicleType ] = useState(null)
    const [ ride, setRide ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    const navigate = useNavigate()

    const { socket } = useContext(SocketContext)
    const { user, isLoading: userLoading } = useContext(UserDataContext)

    useEffect(() => {
        if (user && user._id) {
            console.log('User joining socket:', user._id);
            socket.emit("join", { userType: "user", userId: user._id })
        } else if (!userLoading && !user) {
            console.log('No user data available, redirecting to login');
            navigate('/user-login');
        }
    }, [ user, userLoading, socket, navigate ])

    useEffect(() => {
        socket.on('ride-confirmed', (rideData) => {
            console.log('Ride confirmed by captain:', rideData);
            setVehicleFound(false)
            setWaitingForDriver(true)
            setRide(rideData)
        })

        socket.on('ride-started', (rideData) => {
            console.log("Ride started by captain:", rideData)
            setWaitingForDriver(false)
            navigate('/riding', { state: { ride: rideData } })
        })

        return () => {
            socket.off('ride-confirmed')
            socket.off('ride-started')
        }
    }, [socket, navigate])

    const handlePickupChange = async (e) => {
        const value = e.target.value;
        setPickup(value);
        
        if (value.length < 2) {
            setPickupSuggestions([]);
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const response = await api.get('/maps/get-suggestions', {
                params: { input: value.trim() }
            });

            if (response.data && Array.isArray(response.data)) {
                setPickupSuggestions(response.data);
            } else {
                console.warn('Invalid suggestions format:', response.data);
                setPickupSuggestions([]);
            }
        } catch (error) {
            console.error('Error fetching pickup suggestions:', error);
            setPickupSuggestions([]);
        }
    }

    const handleDestinationChange = async (e) => {
        const value = e.target.value;
        setDestination(value);

        if (value.length < 2) {
            setDestinationSuggestions([]);
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 300));

            const response = await api.get('/maps/get-suggestions', {
                params: { input: value.trim() }
            });

            if (response.data && Array.isArray(response.data)) {
                setDestinationSuggestions(response.data);
            } else {
                console.warn('Invalid suggestions format:', response.data);
                setDestinationSuggestions([]);
            }
        } catch (error) {
            console.error('Error fetching destination suggestions:', error);
            setDestinationSuggestions([]);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    useGSAP(function () {
        if (panelRef.current) {
            if (panelOpen) {
                gsap.to(panelRef.current, {
                    height: '70%',
                    padding: 24
                })
                gsap.to(panelCloseRef.current, {
                    opacity: 1
                })
            } else {
                gsap.to(panelRef.current, {
                    height: '0%',
                    padding: 0
                })
                gsap.to(panelCloseRef.current, {
                    opacity: 0
                })
            }
        }
    }, [ panelOpen ])

    useGSAP(function () {
        if (vehiclePanelRef.current) {
            if (vehiclePanel) {
                gsap.to(vehiclePanelRef.current, {
                    transform: 'translateY(0)'
                })
            } else {
                gsap.to(vehiclePanelRef.current, {
                    transform: 'translateY(100%)'
                })
            }
        }
    }, [ vehiclePanel ])

    useGSAP(function () {
        if (confirmRidePanelRef.current) {
            if (confirmRidePanel) {
                gsap.to(confirmRidePanelRef.current, {
                    transform: 'translateY(0)'
                })
            } else {
                gsap.to(confirmRidePanelRef.current, {
                    transform: 'translateY(100%)'
                })
            }
        }
    }, [ confirmRidePanel ])

    useGSAP(function () {
        if (vehicleFoundRef.current) {
            if (vehicleFound) {
                gsap.to(vehicleFoundRef.current, {
                    transform: 'translateY(0)'
                })
            } else {
                gsap.to(vehicleFoundRef.current, {
                    transform: 'translateY(100%)'
                })
            }
        }
    }, [ vehicleFound ])

    useGSAP(function () {
        if (waitingForDriverRef.current) {
            if (waitingForDriver) {
                gsap.to(waitingForDriverRef.current, {
                    transform: 'translateY(0)'
                })
            } else {
                gsap.to(waitingForDriverRef.current, {
                    transform: 'translateY(100%)'
                })
            }
        }
    }, [ waitingForDriver ])

    async function findTrip() {
        try {
            setLoading(true);
            setVehiclePanel(true)
            setPanelOpen(false)

            console.log('Finding trip:', { pickup, destination });

            const response = await api.get('/rides/get-fare', {
                params: { pickup, destination }
            })

            console.log('Fare calculated:', response.data);
            setFare(response.data)
        } catch (error) {
            console.error('Error finding trip:', error.response?.data?.message || error.message);
            setPanelOpen(true);
            setVehiclePanel(false);
            alert('Could not calculate fare. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    async function createRide() {
        try {
            setLoading(true);
            console.log('Creating ride with:', { pickup, destination, vehicleType });
            
            const response = await api.post('/rides/create', {
                pickup,
                destination,
                vehicleType
            });
            
            console.log('Ride created successfully:', response.data);
            
            if (response.status === 201) {
                setVehicleFound(true);
                setConfirmRidePanel(false);
                setRide(response.data);
                
                // Show success message
                alert('Ride request sent to nearby drivers!');
            }
        } catch (error) {
            console.error('Error creating ride:', error.response?.data?.message || error.message);
            setConfirmRidePanel(true);
            alert('Could not create ride. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    // Show loading if user is loading or not available
    if (userLoading) {
        return (
            <div className="h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading user data...</p>
                </div>
            </div>
        );
    }

    // Show loading if user is not available
    if (!user) {
        return (
            <div className="h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='h-screen relative overflow-hidden bg-gray-50'>
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 p-4">
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber" />
            </div>
            
            {/* Map Background */}
            <div className='h-screen w-screen'>
                <LiveTracking />
            </div>
            
            {/* Bottom Panel */}
            <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
                <div className='h-[35%] p-6 bg-white rounded-t-3xl shadow-2xl relative'>
                    <div 
                        ref={panelCloseRef} 
                        onClick={() => setPanelOpen(false)}
                        className='absolute opacity-0 right-6 top-6 text-2xl text-gray-400 hover:text-gray-600 cursor-pointer transition-colors'
                    >
                        <i className="ri-close-line"></i>
                    </div>
                    
                    <h4 className='text-2xl font-bold text-gray-900 mb-6'>Find a trip</h4>
                    
                    <form className='relative space-y-4' onSubmit={submitHandler}>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gray-300 rounded-full"></div>
                            <input
                                onClick={() => {
                                    setPanelOpen(true)
                                    setActiveField('pickup')
                                }}
                                value={pickup}
                                onChange={handlePickupChange}
                                className='w-full px-12 py-4 text-lg bg-gray-100 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200'
                                type="text"
                                placeholder='Add a pick-up location'
                            />
                        </div>
                        
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gray-300 rounded-full"></div>
                            <input
                                onClick={() => {
                                    setPanelOpen(true)
                                    setActiveField('destination')
                                }}
                                value={destination}
                                onChange={handleDestinationChange}
                                className='w-full px-12 py-4 text-lg bg-gray-100 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200'
                                type="text"
                                placeholder='Enter your destination'
                            />
                        </div>
                    </form>
                    
                    <button
                        onClick={findTrip}
                        disabled={loading || !pickup || !destination}
                        className='w-full bg-black text-white font-semibold py-4 rounded-2xl text-lg mt-6 hover:bg-gray-800 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Finding Trip...' : 'Find Trip'}
                    </button>
                </div>
                
                {/* Location Search Panel */}
                <div ref={panelRef} className='bg-white h-0 overflow-hidden'>
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>
            </div>
            
            {/* Vehicle Selection Panel */}
            <div ref={vehiclePanelRef} className='fixed w-full z-30 bottom-0 translate-y-full bg-white rounded-t-3xl shadow-2xl'>
                <VehiclePanel
                    selectVehicle={setVehicleType}
                    fare={fare} 
                    setConfirmRidePanel={setConfirmRidePanel} 
                    setVehiclePanel={setVehiclePanel} 
                />
            </div>
            
            {/* Confirm Ride Panel */}
            <div ref={confirmRidePanelRef} className='fixed w-full z-30 bottom-0 translate-y-full bg-white rounded-t-3xl shadow-2xl'>
                <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel} 
                    setVehicleFound={setVehicleFound} 
                    loading={loading}
                />
            </div>
            
            {/* Looking for Driver Panel */}
            <div ref={vehicleFoundRef} className='fixed w-full z-30 bottom-0 translate-y-full bg-white rounded-t-3xl shadow-2xl'>
                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound} 
                />
            </div>
            
            {/* Waiting for Driver Panel */}
            <div ref={waitingForDriverRef} className='fixed w-full z-30 bottom-0 bg-white rounded-t-3xl shadow-2xl'>
                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver} 
                />
            </div>
        </div>
    )
}

export default Home