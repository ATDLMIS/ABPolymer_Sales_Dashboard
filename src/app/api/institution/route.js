import Axios from '@/utils/axios';
import axios from 'axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function GET(request) {
    const headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });

    // Handle Preflight Request
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers
        });
    }

    // Your actual API logic
    const data = { message: 'CORS is configured!' };

    return new Response(JSON.stringify(data), {
        status: 200,
        headers
    });
}

export const POST = async request => {
  try {
    const formData = await request.formData();

    const image = formData.get('InstitutionScanImagePath');
    console.log(image);

    console.log(formData);

    const res = await Axios.post(
      '?action=create_institution',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log(res);

    // {
    //   "institutionTypeID": 1,
    //   "institutionName": "Dhaka High School",
    //   "TotalStudents": 1500,
    //   "ContactPersonName": "Rahim Uddin",
    //   "Designation": "Principal",
    //   "ContactPhone": "01712345678",
    //   "Address": "123 Dhaka Road",
    //   "RegionID": 1,
    //   "InstitutionScanImagePath": "/images/institution1.jpg",
    //   "details": [
    //     {
    //       "TeacherName": "Nur Islam",
    //       "Designation": "Math Teacher",
    //       "ContactPhone": "01712345678",
    //       "sndClassID": 1,
    //       "sndSubjectID": 1
    //     },
    //     {
    //       "TeacherName": "Liza Akter",
    //       "Designation": "English Teacher",
    //       "ContactPhone": "01712345679",
    //       "sndClassID": 1,
    //       "sndSubjectID": 2
    //     }
    //   ]
    // }

    return Response.redirect(`${process.env.URL_DOMAIN}/dashboard/institution`);
  } catch (error) {
    return new Response('failed to add User', {
      status: 500,
    });
  }
};
