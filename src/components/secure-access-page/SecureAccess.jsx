import img1 from '../../assets/info-from-img/images.png'
import img2 from '../../assets/info-from-img/img-seal-qualys.svg'
import img3 from '../../assets/secure-imfo/img-check-score.png'
import img4 from '../../assets/secure-imfo/img-security-shield.svg'
import { useState, useEffect } from 'react';

const SecureAccess = () => {
    const [ssn1, setSsn1] = useState('');
    const [ssn2, setSsn2] = useState('');
    const [ssn3, setSsn3] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [errors, setErrors] = useState({
        month: '',
        day: '',
        year: ''
    });

    const currentYear = new Date().getFullYear();

    const validateDate = () => {
        const newErrors = { month: '', day: '', year: '' };
        let isValid = true;

        // Validate month (01-12)
        if (month === '' || isNaN(month) || parseInt(month) < 1 || parseInt(month) > 12) {
            newErrors.month = 'Enter a valid month (01-12)';
            isValid = false;
        }

        // Validate day based on month and year
        if (day === '' || isNaN(day)) {
            newErrors.day = 'Enter a valid day';
            isValid = false;
        } else {
            // Calculate max days in the month
            let maxDays = 31;
            if (month === '04' || month === '06' || month === '09' || month === '11') {
                maxDays = 30;
            } else if (month === '02') {
                // Check for leap year if February
                const yearNum = year ? parseInt(year) : currentYear;
                const isLeapYear = (yearNum % 4 === 0 && yearNum % 100 !== 0) || yearNum % 400 === 0;
                maxDays = isLeapYear ? 29 : 28;
            }

            if (parseInt(day) < 1 || parseInt(day) > maxDays) {
                newErrors.day = `Day must be between 01 and ${maxDays}`;
                isValid = false;
            }
        }

        // Validate year (1900-current year)
        if (year === '' || isNaN(year) || year.length !== 4 || parseInt(year) < 1900 || parseInt(year) > currentYear) {
            newErrors.year = `Enter a valid year (1900-${currentYear})`;
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    useEffect(() => {
        if (month || day || year) {
            validateDate();
        }
    }, [month, day, year]);

    const handleSsn1Change = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 3) {
            setSsn1(value);
            if (value.length === 3) {
                document.getElementById('ssn2').focus();
            }
        }
    };

    const handleSsn2Change = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 2) {
            setSsn2(value);
            if (value.length === 2) {
                document.getElementById('ssn3').focus();
            }
        }
    };

    const handleSsn3Change = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 4) {
            setSsn3(value);
        }
    };

    const handleMonthChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 12)) {
            // Allow empty value or valid month
            if (value === '0') {
                setMonth('');
            } else if (value === '') {
                setMonth('');
            } else {
                // Pad with leading zero if single digit (but not 0)
                const paddedValue = value.length === 1 ? `0${value}` : value;
                setMonth(paddedValue.slice(0, 2));
            }
            if (value.length === 2) {
                document.getElementById('day').focus();
            }
        }
    };

    const handleDayChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 31)) {
            // Allow empty value or valid day
            if (value === '0') {
                setDay('');
            } else if (value === '') {
                setDay('');
            } else {
                // Pad with leading zero if single digit (but not 0)
                const paddedValue = value.length === 1 ? `0${value}` : value;
                setDay(paddedValue.slice(0, 2));
            }
            if (value.length === 2) {
                document.getElementById('year').focus();
            }
        }
    };

    const handleYearChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 4) {
            setYear(value);
        }
    };

    const handleBlur = () => {
        validateDate();
    };

    return (
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-[100%] md:w-[80%] mx-auto mt-2 md:mt-10 mb-8">
            {/* Left side form */}
            <div className="w-full md:w-[60%] p-8">
                <h2 className="text-3xl text-gray-600 font-light mb-2">Step 2. Secure Access</h2>
                <p className="text-sm flex flex-row gap-3 text-gray-600 mb-4">
                    <img className='h-18' src={img4} alt="" />
                    <div className='text-[16px] text-gray-500 font-light'>
                        You must provide correct information to authorize access to your credit file.
                        <span className="ml-1 text-blue-500 cursor-pointer">ℹ️</span>
                    </div>
                </p>

                {/* Social Security Number */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Social Security Number</label>
                    <div className="flex gap-2">
                        <input
                            type="password"
                            className="w-1/3 border-[#c5c5c5] border-2 rounded px-3 py-2"
                            maxLength={3}
                            value={ssn1}
                            onChange={handleSsn1Change}
                            autoComplete="off"
                        />
                        <input
                            id="ssn2"
                            type="password"
                            className="w-1/3 border-[#c5c5c5] border-2 rounded px-3 py-2"
                            maxLength={2}
                            value={ssn2}
                            onChange={handleSsn2Change}
                            autoComplete="off"
                        />
                        <input
                            id="ssn3"
                            type="password"
                            className="w-1/3 border-[#c5c5c5] border-2 rounded px-3 py-2"
                            maxLength={4}
                            value={ssn3}
                            onChange={handleSsn3Change}
                            autoComplete="off"
                        />
                    </div>
                </div>

                {/* Date of Birth */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Date of Birth</label>
                    <div className="flex gap-2">
                        <input
                            id="month"
                            type="text"
                            placeholder="MM"
                            className={`w-1/3 border-[#c5c5c5] border-2 rounded px-3 py-2 ${errors.month ? 'border-red-500' : ''}`}
                            maxLength={2}
                            value={month}
                            onChange={handleMonthChange}
                            onBlur={handleBlur}
                            inputMode="numeric"
                        />
                        <input
                            id="day"
                            type="text"
                            placeholder="DD"
                            className={`w-1/3 border-[#c5c5c5] border-2 rounded px-3 py-2 ${errors.day ? 'border-red-500' : ''}`}
                            maxLength={2}
                            value={day}
                            onChange={handleDayChange}
                            onBlur={handleBlur}
                            inputMode="numeric"
                        />
                        <input
                            id="year"
                            type="text"
                            placeholder="YYYY"
                            className={`w-1/3 border-[#c5c5c5] border-2 rounded px-3 py-2 ${errors.year ? 'border-red-500' : ''}`}
                            maxLength={4}
                            value={year}
                            onChange={handleYearChange}
                            onBlur={handleBlur}
                            inputMode="numeric"
                        />
                    </div>
                    <div className="text-red-500 text-xs mt-1">
                        {errors.month && <div>{errors.month}</div>}
                        {errors.day && !errors.month && <div>{errors.day}</div>}
                        {errors.year && !errors.day && !errors.month && <div>{errors.year}</div>}
                    </div>
                </div>
                <div className='text-3xl text-gray-600 font-light mt-10'>
                    <h1>Setup Your Password</h1>
                </div>
                {/* Password Fields */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input type="password" className="w-full border-[#c5c5c5] border-2 rounded px-3 py-2" />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Confirm Password</label>
                    <input type="password" className="w-full border-[#c5c5c5] border-2 rounded px-3 py-2" />
                </div>

                {/* Continue Button */}
                <div className="flex justify-center">
                    <button className="bg-[#7fbdff] hover:bg-blue-700 text-white py-2 px-21 rounded mb-0 font-medium  w-full md:w-auto text-[13px]">
                        CONTINUE
                    </button>
                </div>

                {/* Security Badges */}
                <div className="flex items-center justify-center gap-4 mt-6">
                    <img src={img1} alt="Security Seal" className="h-8" />
                    <img src={img2} alt="Qualys Seal" className="h-9" />
                </div>
            </div>

            {/* Right side info */}
            <div className="w-full md:w-[40%] bg-[#cfd2d4] flex flex-col justify-center items-center p-2">
                <img src={img3} alt="Credit Score" className=" h-86 mb-4" />
                <h3 className="text-2xl text-[#7e8284] mb-6 font-light">Will This Affect My Credit?</h3>
                <p className="text-sm text-[#7e8284] text-center">
                    Absolutely not! Checking your score on{" "} <br />
                    <a href="https://www.bestfreescore.com" className=" text-[#7e8284] no-underline text-[16px]">eviction
                        checkers.com</a> is a soft inquiry, which will never affect <br /> your credit.
                </p>
            </div>
        </div>
    );
};

export default SecureAccess;