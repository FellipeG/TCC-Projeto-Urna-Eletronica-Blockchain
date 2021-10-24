class ServiceUtils
{
    paginatedResponse(total, data)
    {
        return {
            total,
            data
        }
    }

    response(data)
    {
        return { data }
    }
}

export default ServiceUtils;