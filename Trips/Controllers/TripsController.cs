using Microsoft.AspNetCore.Mvc;
using Trips.Data;

namespace Trips.Controllers
{
     [Route("api/[controller]")]
    public class TripsController: Controller
    {
        private readonly ITripService tripService;

        public TripsController(ITripService tripService)
        {
            this.tripService = tripService;
        }

        [HttpGet("[action]")]
        public IActionResult GetTrips()
        {
            var allTrips = tripService.GetAllTrips();
            return Ok(allTrips);
        }

        [HttpGet("SingleTrip/{id}")]
        public IActionResult GetTripById(int id)
        {
            var trip = tripService.GetTripById(id);
            return Ok(trip);
        }
        
        [HttpPost("AddTrip")]
        public IActionResult AddTrip([FromBody] Trip trip)
        {
            if(trip != null)
            {
                  tripService.AddTrip(trip);
            }
            return Ok();
        }

        [HttpPut("UpdateTrip/{id}")]
        public IActionResult UpdateTrip(int id, [FromBody] Trip trip)
        {
            tripService.UpdateTrip(id, trip);
            return Ok(trip);
        }

        [HttpDelete("DeleteTrip/{id}")]
        public IActionResult DeleteTrip(int id)
        {
            tripService.DeleteTrip(id);
            return Ok();
        }
    }
}
