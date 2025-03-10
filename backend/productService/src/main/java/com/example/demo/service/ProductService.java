package com.example.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Product;
import com.example.demo.repo.ProductRepository;

import java.util.List;

@Service
public class ProductService {
	@Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

	public Product addProduct(Product product) {
        return productRepository.save(product);
    }

	public Product save(Product product) {
		// TODO Auto-generated method stub
		return productRepository.save(product);
	}

	public void deleteProduct(Long id) {
		// TODO Auto-generated method stub
		productRepository.deleteById(id);
	}
    
}
