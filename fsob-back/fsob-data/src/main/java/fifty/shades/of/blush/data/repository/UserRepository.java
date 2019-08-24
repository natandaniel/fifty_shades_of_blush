package fifty.shades.of.blush.data.repository;

import java.util.Optional;

import org.springframework.data.repository.PagingAndSortingRepository;

import fifty.shades.of.blush.domain.User;

public interface UserRepository extends PagingAndSortingRepository<User, Long>  {

	Optional<User> findByUsername(String username);

}
