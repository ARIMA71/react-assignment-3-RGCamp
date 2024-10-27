import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import { useEffect, useState } from "react";
const url = 'http://localhost:3001/student';

const EditStudent = () => {
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState("");
    const [fullname, setFullname] = useState("");
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("Male");
    const [programstudy, setProgramstudy] = useState("Ekonomi");
    const navigate = useNavigate();
    const { id } = useParams();

    const faculties = {
        'Ekonomi': "Fakultas Ekonomi",
        'Manajemen': "Fakultas Ekonomi",
        'Akuntansi': "Fakultas Ekonomi",
        'Administrasi Publik': "Fakultas Ilmu Sosial dan Politik",
        'Administrasi Bisnis': "Fakultas Ilmu Sosial dan Politik",
        'Hubungan Internasional': "Fakultas Ilmu Sosial dan Politik",
        'Teknik Sipil': "Fakultas Teknik",
        'Arsitektur': "Fakultas Teknik",
        'Matematika': "Fakultas Teknologi Informasi dan Sains",
        'Fisika': "Fakultas Teknologi Informasi dan Sains",
        'Informatika': "Fakultas Teknologi Informasi dan Sains",
        };

    useEffect(() => {
        fetch(`${url}/${id}`)
        .then((response) => response.json())
        .then((data) => {
            setStudents(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
            setLoading(false);
        });
    }, [id])

    const updateStudent = (event) => {
        event.preventDefault();
        fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fullname: fullname,
            profilePicture: students.profilePicture,
            address: address,
            phoneNumber: number,
            birthDate: birthDate,
            gender: gender,
            programStudy: programstudy,
            faculty: faculties[programstudy],
        }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
            console.log(data);
            return;
            }
            navigate("/student");
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <NavBar />
            {loading ? (
                <p style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>Loading ...</p>
            ): (
                <form id="form-student" onSubmit={updateStudent} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label>Profile Picture</label>
                    <img src={students.profilePicture} alt="gambar.png" style={{ width: '200px', height: 'auto' }}/>

                    <label for="input-name">Fullname</label>
                    <input
                        id="input-name"
                        type="text"
                        data-testid="name"
                        required
                        onChange={(e) => setFullname(e.target.value)}
                        defaultValue={students.fullname}
                    />

                    <label>Address</label>
                    <input
                        type="text"
                        data-testid="address"
                        required
                        defaultValue={students.address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <label>Phone Number</label>
                    <input
                        type="text"
                        data-testid="phoneNumber"
                        required
                        defaultValue={students.phoneNumber}
                        onChange={(e) => setNumber(e.target.value)}
                    />

                    <label>Birth Date</label>
                    <input
                        type="date"
                        data-testid="date"
                        required
                        defaultValue={students.birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />

                    <label>Gender</label>
                    <select
                        data-testid="gender"
                        required
                        defaultValue={students.gender}
                        onChange={(e) => setGender(e.target.value)}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                    </select>

                    <label>Program Study</label>
                    <select
                        data-testid="prody"
                        required
                        defaultValue={students.programStudy}
                        onChange={(e) => {
                        setProgramstudy(e.target.value)}}>
                            <option value="Ekonomi">Ekonomi</option>
                            <option value="Manajemen">Manajemen</option>
                            <option value="Akuntansi">Akuntansi</option>
                            <option value="Administrasi Publik">Administrasi Publik</option>
                            <option value="Administrasi Bisnis">Administrasi Bisnis</option>
                            <option value="Hubungan Internasional">Hubungan Internasional</option>
                            <option value="Teknik Sipil">Teknik Sipil</option>
                            <option value="Arsitektur">Arsitektur</option>
                            <option value="Matematika">Matematika</option>
                            <option value="Fisika">Fisika</option>
                            <option value="Informatika">Informatika</option>
                    </select>

                    <input type="submit" value="Edit student" data-testid="edit-btn" 
                        style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#0077b6', color: '#fff', fontSize: '16px' }}
                    />
                </form>
            )}
        </div>
    );
};

export default EditStudent;