
const endPoints = {
    login :{
        method:'POST',
        url:'/api/v1/login'
    },
    getProfile:{
        method:'GET',
        url:'/api/v1/profile'
    },
    register:{
        method:'POST',
        url:'/api/v1/register'
    },
    studentProfile:{
        method:'PUT',
        url:'/api/v1/student/profile'
    },
    imageUpload:{
        method:'POST',
        url:'/api/v1/image/upload'
    },
    avatarUpload:{
        method:'PUT',
        url:'/api/v1/avatar'
    },
    addStudentProject:{
        method:'POST',
        url:'/api/v1/student/add-project'
    },
    getStudentProjects:{
        method:'GET',
        url:'/api/v1/student/projects'
    },
    deleteStudentProject: {
      method: 'DELETE',
      url: '/api/v1/student/project/' // + projectId when used
    },
    facultyProfile:{
        method:'PUT',
        url:'/api/v1/faculty/profile'
    },
    addFacultyPublication:{
        method:'POST',
        url:'/api/v1/faculty/publications'
    },
    getPublicationsByIds:{
        method:'POST',
        url:'/api/v1/publications/batch'
    }
}

export default endPoints